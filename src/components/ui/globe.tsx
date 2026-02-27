"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useCallback } from "react";

interface GlobeProps {
    className?: string;
    size?: number | string;
    dotColor?: string;
    arcColor?: string;
    markerColor?: string;
    autoRotateSpeed?: number;
    connections?: { from: [number, number]; to: [number, number] }[];
    markers?: { lat: number; lng: number; label?: string }[];
}

const DEFAULT_MARKERS = [
    { lat: 37.56, lng: 126.97, label: "Identity" },      // Seoul
    { lat: 35.67, lng: 139.65, label: "Experience" },    // Tokyo
    { lat: 40.71, lng: -74.00, label: "Branding" },      // New York
    { lat: 34.05, lng: -118.24, label: "Value" },        // LA
    { lat: 51.50, lng: -0.12, label: "Strategy" },       // London
    { lat: 48.85, lng: 2.35, label: "Creative" },        // Paris
    { lat: -33.86, lng: 151.20, label: "Growth" },       // Sydney
    { lat: 1.35, lng: 103.81, label: "Performance" },    // Singapore
    { lat: 25.03, lng: 121.56, label: "Storytelling" },  // Taipei
    { lat: -23.55, lng: -46.63, label: "Purpose" },      // Sao Paulo
    { lat: 30.04, lng: 31.23, label: "Foundation" },     // Cairo
    { lat: -26.20, lng: 28.04, label: "Core" },          // Johannesburg
    { lat: 19.43, lng: -99.13, label: "Philosophy" },    // Mexico City
    { lat: 55.75, lng: 37.61, label: "Vision" },         // Moscow
    { lat: 28.61, lng: 77.20, label: "Innovation" },     // Delhi
    { lat: -34.60, lng: -58.38, label: "Impact" },       // Buenos Aires
    { lat: 52.52, lng: 13.40, label: "Concept" },        // Berlin
    { lat: 45.42, lng: -75.69, label: "Analysis" },      // Ottawa
];

const DEFAULT_CONNECTIONS: { from: [number, number]; to: [number, number] }[] =
    [
        // 아시아 & 태평양 허브 (Seoul)
        { from: [37.56, 126.97], to: [40.71, -74.00] },
        { from: [37.56, 126.97], to: [51.50, -0.12] },
        { from: [37.56, 126.97], to: [35.67, 139.65] },
        { from: [37.56, 126.97], to: [1.35, 103.81] },

        // 북미 연결
        { from: [40.71, -74.00], to: [51.50, -0.12] },
        { from: [40.71, -74.00], to: [45.42, -75.69] },
        { from: [34.05, -118.24], to: [40.71, -74.00] },
        { from: [34.05, -118.24], to: [25.03, 121.56] },
        { from: [19.43, -99.13], to: [40.71, -74.00] },

        // 유럽 허브 (London, Paris, Berlin)
        { from: [51.50, -0.12], to: [48.85, 2.35] },
        { from: [48.85, 2.35], to: [52.52, 13.40] },
        { from: [52.52, 13.40], to: [55.75, 37.61] },

        // 남미 연결
        { from: [19.43, -99.13], to: [-23.55, -46.63] },
        { from: [-34.60, -58.38], to: [-23.55, -46.63] },
        { from: [34.05, -118.24], to: [-23.55, -46.63] },

        // 아시아 및 오세아니아
        { from: [35.67, 139.65], to: [-33.86, 151.20] },
        { from: [1.35, 103.81], to: [-33.86, 151.20] },
        { from: [1.35, 103.81], to: [28.61, 77.20] },
        { from: [25.03, 121.56], to: [1.35, 103.81] },

        // 이머징 및 아프리카
        { from: [52.52, 13.40], to: [30.04, 31.23] },
        { from: [30.04, 31.23], to: [28.61, 77.20] },
        { from: [30.04, 31.23], to: [-26.20, 28.04] },
        { from: [-26.20, 28.04], to: [-23.55, -46.63] },
    ];

function latLngToXYZ(
    lat: number,
    lng: number,
    radius: number
): [number, number, number] {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lng + 180) * Math.PI) / 180;
    return [
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
    ];
}

function rotateY(
    x: number,
    y: number,
    z: number,
    angle: number
): [number, number, number] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(
    x: number,
    y: number,
    z: number,
    angle: number
): [number, number, number] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(
    x: number,
    y: number,
    z: number,
    cx: number,
    cy: number,
    fov: number
): [number, number, number] {
    const scale = fov / (fov + z);
    return [x * scale + cx, y * scale + cy, z];
}

export function Globe({
    className,
    size = 600,
    dotColor = "rgba(34, 34, 34, ALPHA)",
    arcColor = "rgba(228, 123, 65, 0.4)",
    markerColor = "rgba(228, 123, 65, 1)",
    autoRotateSpeed = 0.002,
    connections = DEFAULT_CONNECTIONS,
    markers = DEFAULT_MARKERS,
}: GlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotYRef = useRef(0.4);
    const rotXRef = useRef(0.3);
    const dragRef = useRef<{
        active: boolean;
        startX: number;
        startY: number;
        startRotY: number;
        startRotX: number;
    }>({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    // Generate globe dots (land approximation via density sampling)
    const dotsRef = useRef<[number, number, number][]>([]);

    useEffect(() => {
        const dots: [number, number, number][] = [];
        const numDots = 1200;
        // Fibonacci sphere
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        for (let i = 0; i < numDots; i++) {
            const theta = (2 * Math.PI * i) / goldenRatio;
            const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
            const x = Math.cos(theta) * Math.sin(phi);
            const y = Math.cos(phi);
            const z = Math.sin(theta) * Math.sin(phi);
            dots.push([x, y, z]);
        }
        dotsRef.current = dots;
    }, []);

    const draw = useCallback(function renderFrame() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) * 0.42;
        const fov = 600;

        // Auto rotate
        if (!dragRef.current.active) {
            rotYRef.current += autoRotateSpeed;
        }

        timeRef.current += 0.015;
        const time = timeRef.current;

        ctx.clearRect(0, 0, w, h);

        // Outer glow
        const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.5);
        glowGrad.addColorStop(0, "rgba(228, 123, 65, 0.03)");
        glowGrad.addColorStop(1, "rgba(228, 123, 65, 0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, w, h);

        // Globe outline
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(17, 17, 17, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const ry = rotYRef.current;
        const rx = rotXRef.current;

        // Draw dots
        const dots = dotsRef.current;
        for (let i = 0; i < dots.length; i++) {
            let [x, y, z] = dots[i];
            x *= radius;
            y *= radius;
            z *= radius;

            [x, y, z] = rotateX(x, y, z, rx);
            [x, y, z] = rotateY(x, y, z, ry);

            if (z > 0) continue; // back-face cull

            const [sx, sy] = project(x, y, z, cx, cy, fov);
            const depthAlpha = Math.max(0.15, 1 - (z + radius) / (2 * radius));
            const dotSize = 1.0 + depthAlpha * 1.5;

            ctx.beginPath();
            ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
            ctx.fill();
        }

        // Draw connections as arcs
        for (const conn of connections) {
            const [lat1, lng1] = conn.from;
            const [lat2, lng2] = conn.to;

            let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
            let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);

            [x1, y1, z1] = rotateX(x1, y1, z1, rx);
            [x1, y1, z1] = rotateY(x1, y1, z1, ry);
            [x2, y2, z2] = rotateX(x2, y2, z2, rx);
            [x2, y2, z2] = rotateY(x2, y2, z2, ry);

            // Only draw if both points face camera
            if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

            const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
            const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

            // Elevated midpoint for arc
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const midZ = (z1 + z2) / 2;
            const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
            const arcHeight = radius * 1.25;
            const elevX = (midX / midLen) * arcHeight;
            const elevY = (midY / midLen) * arcHeight;
            const elevZ = (midZ / midLen) * arcHeight;
            const [scx, scy] = project(elevX, elevY, elevZ, cx, cy, fov);

            ctx.beginPath();
            ctx.moveTo(sx1, sy1);
            ctx.quadraticCurveTo(scx, scy, sx2, sy2);
            ctx.strokeStyle = arcColor;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Traveling dot along arc
            const t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
            const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
            const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;

            ctx.beginPath();
            ctx.arc(tx, ty, 2, 0, Math.PI * 2);
            ctx.fillStyle = markerColor;
            ctx.fill();
        }

        // Randomly pick a highlight index based on time
        // Changes every ~3 seconds
        const highlightIndex = Math.floor(time / 2) % markers.length;

        // Draw markers
        for (let i = 0; i < markers.length; i++) {
            const marker = markers[i];
            let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
            [x, y, z] = rotateX(x, y, z, rx);
            [x, y, z] = rotateY(x, y, z, ry);

            if (z > radius * 0.1) continue;

            const [sx, sy] = project(x, y, z, cx, cy, fov);

            // Check if this is the highlighted marker
            const isHighlighted = i === highlightIndex;
            const currentColor = isHighlighted ? "rgba(214, 0, 0, 1)" : markerColor;

            // Pulse ring
            let pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;
            if (isHighlighted) pulse = (Math.sin(time * 6) * 0.5 + 0.5) * 1.5; // Faster, larger pulse for highlighted

            ctx.beginPath();
            ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
            ctx.strokeStyle = currentColor.replace("1)", `${0.2 + pulse * 0.15})`);
            ctx.lineWidth = isHighlighted ? 1.5 : 1;
            ctx.stroke();

            // Core dot
            ctx.beginPath();
            ctx.arc(sx, sy, isHighlighted ? 4 : 3, 0, Math.PI * 2);
            ctx.fillStyle = currentColor;
            ctx.fill();

            // Label
            if (marker.label) {
                ctx.font = isHighlighted ? "bold 13px Inter, system-ui, sans-serif" : "bold 12px Inter, system-ui, sans-serif";
                ctx.fillStyle = currentColor.replace("1)", isHighlighted ? "1)" : "0.9)");
                ctx.fillText(marker.label, sx + 10, sy + 4);
            }
        }

        animRef.current = requestAnimationFrame(renderFrame);
    }, [dotColor, arcColor, markerColor, autoRotateSpeed, connections, markers]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [draw]);

    // Mouse drag handlers
    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            dragRef.current = {
                active: true,
                startX: e.clientX,
                startY: e.clientY,
                startRotY: rotYRef.current,
                startRotX: rotXRef.current,
            };
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        },
        []
    );

    const onPointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!dragRef.current.active) return;
            const dx = e.clientX - dragRef.current.startX;
            const dy = e.clientY - dragRef.current.startY;
            rotYRef.current = dragRef.current.startRotY + dx * 0.005;
            rotXRef.current = Math.max(
                -1,
                Math.min(1, dragRef.current.startRotX + dy * 0.005)
            );
        },
        []
    );

    const onPointerUp = useCallback(() => {
        dragRef.current.active = false;
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={cn("w-full h-full cursor-grab active:cursor-grabbing", className)}
            style={{ width: size, height: size }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
        />
    );
}
