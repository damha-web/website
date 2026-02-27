"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * 마우스를 따라가는 무지개빛 곡선 트레일 캔버스 효과
 * - 페이지 전체 배경에 깔리는 인터랙티브 비주얼
 */

interface NodePoint {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

const E = {
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
};

export function CanvasTrailEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const runningRef = useRef(true);
    const frameRef = useRef(1);
    const posRef = useRef({ x: 0, y: 0 });
    const linesRef = useRef<ReturnType<typeof createLine>[]>([]);
    const offsetRef = useRef(285);
    const amplitudeRef = useRef(85);
    const frequencyRef = useRef(0.0015);
    const initializedRef = useRef(false);
    const pulseRef = useRef(0);

    // 브랜드 로고 추출 색상 (RGB)
    // #C94B43 (레드오렌지), #D36554 (밝은오렌지), #DFAC3A (옐로우), #444489 (퍼플블루)
    const brandColors = [
        { r: 201, g: 75, b: 67 },
        { r: 211, g: 101, b: 84 },
        { r: 223, g: 172, b: 58 },
        { r: 68, g: 68, b: 137 }
    ];

    const getInterpolatedColor = useCallback(() => {
        // 프레임에 따라 느리게 색상 인덱스 이동 (1 프레임당 속도 조절: 150프레임마다 색상 변경)
        const speed = 150;
        const currentIndex = Math.floor(frameRef.current / speed) % brandColors.length;
        const nextIndex = (currentIndex + 1) % brandColors.length;
        const progress = (frameRef.current % speed) / speed;

        const c1 = brandColors[currentIndex];
        const c2 = brandColors[nextIndex];

        const r = Math.round(c1.r + (c2.r - c1.r) * progress);
        const g = Math.round(c1.g + (c2.g - c1.g) * progress);
        const b = Math.round(c1.b + (c2.b - c1.b) * progress);

        // pulseRef.current에 따라 투명도 증가 (0.025 ~ 0.1)
        const alpha = 0.025 + pulseRef.current * 0.075;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }, []);

    const createNode = useCallback((): NodePoint => ({
        x: 0, y: 0, vx: 0, vy: 0,
    }), []);

    const createLine = useCallback((spring: number) => {
        const s = spring + 0.1 * Math.random() - 0.05;
        const friction = E.friction + 0.01 * Math.random() - 0.005;
        const nodes: NodePoint[] = [];
        for (let i = 0; i < E.size; i++) {
            const node = createNode();
            node.x = posRef.current.x;
            node.y = posRef.current.y;
            nodes.push(node);
        }
        return { spring: s, friction, nodes };
    }, [createNode]);

    const updateLine = useCallback((line: ReturnType<typeof createLine>) => {
        let spring = line.spring;
        let t = line.nodes[0];
        t.vx += (posRef.current.x - t.x) * spring;
        t.vy += (posRef.current.y - t.y) * spring;

        for (let i = 0; i < line.nodes.length; i++) {
            t = line.nodes[i];
            if (i > 0) {
                const prev = line.nodes[i - 1];
                t.vx += (prev.x - t.x) * spring;
                t.vy += (prev.y - t.y) * spring;
                t.vx += prev.vx * E.dampening;
                t.vy += prev.vy * E.dampening;
            }
            t.vx *= line.friction;
            t.vy *= line.friction;
            t.x += t.vx;
            t.y += t.vy;
            spring *= E.tension;
        }
    }, []);

    const drawLine = useCallback((ctx: CanvasRenderingContext2D, line: ReturnType<typeof createLine>) => {
        let x = line.nodes[0].x;
        let y = line.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(x, y);

        let a: NodePoint;
        let b: NodePoint;
        const len = line.nodes.length - 2;
        let i;
        for (i = 1; i < len; i++) {
            a = line.nodes[i];
            b = line.nodes[i + 1];
            x = 0.5 * (a.x + b.x);
            y = 0.5 * (a.y + b.y);
            ctx.quadraticCurveTo(a.x, a.y, x, y);
        }
        a = line.nodes[i];
        b = line.nodes[i + 1];
        ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
        ctx.stroke();
        ctx.closePath();
    }, []);

    const render = useCallback(() => {
        const ctx = ctxRef.current;
        if (!ctx || !runningRef.current) return;

        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = "lighter";

        // 커스텀 브랜드 컬러 적용
        ctx.strokeStyle = getInterpolatedColor();
        // pulseRef.current에 따라 선 두께 증가 (10 ~ 25)
        ctx.lineWidth = 10 + pulseRef.current * 15;

        for (let i = 0; i < E.trails; i++) {
            const line = linesRef.current[i];
            if (line) {
                updateLine(line);
                drawLine(ctx, line);
            }
        }

        // Pulse decay
        if (pulseRef.current > 0) {
            pulseRef.current -= 0.02;
            if (pulseRef.current < 0) pulseRef.current = 0;
        }

        frameRef.current++;
        window.requestAnimationFrame(render);
    }, [getInterpolatedColor, updateLine, drawLine]);

    const initLines = useCallback(() => {
        linesRef.current = [];
        for (let i = 0; i < E.trails; i++) {
            linesRef.current.push(createLine(0.45 + (i / E.trails) * 0.025));
        }
    }, [createLine]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || initializedRef.current) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctxRef.current = ctx;
        initializedRef.current = true;
        runningRef.current = true;

        // 초기 포지션 (화면 중앙)
        posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        resizeCanvas();

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if ('touches' in e && e.touches.length > 0) {
                posRef.current.x = e.touches[0].pageX;
                posRef.current.y = e.touches[0].pageY;
            } else if ('clientX' in e) {
                posRef.current.x = e.clientX;
                posRef.current.y = e.clientY;
            }
        };

        const handleClick = () => {
            pulseRef.current = 1.0;
        };

        const handleFirstInteraction = (e: MouseEvent | TouchEvent) => {
            document.removeEventListener("mousemove", handleFirstInteraction);
            document.removeEventListener("touchstart", handleFirstInteraction);
            document.addEventListener("mousemove", handleMove);
            document.addEventListener("touchmove", handleMove);
            document.addEventListener("touchstart", (ev) => {
                if (ev.touches.length === 1) {
                    posRef.current.x = ev.touches[0].pageX;
                    posRef.current.y = ev.touches[0].pageY;
                }
            });
            window.addEventListener("mousedown", handleClick);
            window.addEventListener("touchstart", handleClick);
            handleMove(e);
            initLines();
            render();
        };

        document.addEventListener("mousemove", handleFirstInteraction);
        document.addEventListener("touchstart", handleFirstInteraction);

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("focus", () => {
            if (!runningRef.current) {
                runningRef.current = true;
                render();
            }
        });

        return () => {
            runningRef.current = false;
            initializedRef.current = false;
            document.removeEventListener("mousemove", handleFirstInteraction);
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("touchstart", handleFirstInteraction);
            window.removeEventListener("mousedown", handleClick);
            window.removeEventListener("touchstart", handleClick);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [initLines, render, resizeCanvas]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[1] mx-auto"
            style={{ width: '100vw', height: '100vh' }}
        />
    );
}
