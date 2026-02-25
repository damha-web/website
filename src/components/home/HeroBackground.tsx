"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    const moveX = useTransform(smoothMouseX, [0, 1], [-15, 15]);
    const moveY = useTransform(smoothMouseY, [0, 1], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                mouseX.set(x);
                mouseY.set(y);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* User Attached Background Image - Hero Sunset */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
                style={{ backgroundImage: "url('/assets/images/hero_sunset.jpg')" }}
            />

            {/* Main Color Glow (#D60000) */}
            <motion.div
                style={{ x: moveX, y: moveY }}
                className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#D60000]/15 blur-[120px]"
            />

            {/* Sub Color Glow (Point Red) */}
            <motion.div
                style={{ x: moveY, y: moveX }}
                className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#D60000]/10 blur-[100px]"
            />
        </div>
    );
}
