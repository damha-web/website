"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeInUp } from "@/lib/animation-variants";

const TITLES = [
    { main: "Beyond Marketing,\nTowards Strategy.", sub: "마케팅 그 이상, 비즈니스의 답을 찾다." },
    { main: "Integrated Insight,\nUnlimited Growth.", sub: "통합된 통찰로 한계 없는 성장을 만들다." },
    { main: "Precision Analysis,\nProven Results.", sub: "정교한 분석이 증명하는 확실한 결과." }
];

export default function HeroTitle() {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [phase, setPhase] = useState<'typing' | 'wait' | 'deleting' | 'pause'>('typing');

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentFullText = TITLES[currentTitleIndex].main;

        if (phase === 'typing') {
            if (displayText.length < currentFullText.length) {
                timeout = setTimeout(() => setDisplayText(currentFullText.slice(0, displayText.length + 1)), 100);
            } else {
                timeout = setTimeout(() => setPhase('wait'), 0);
            }
        } else if (phase === 'wait') {
            timeout = setTimeout(() => setPhase('deleting'), 4000); // 4초 대기
        } else if (phase === 'deleting') {
            if (displayText.length > 0) {
                timeout = setTimeout(() => setDisplayText(currentFullText.slice(0, displayText.length - 1)), 40);
            } else {
                timeout = setTimeout(() => setPhase('pause'), 0);
            }
        } else if (phase === 'pause') {
            timeout = setTimeout(() => {
                setPhase('typing');
                setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
            }, 500);
        }

        return () => clearTimeout(timeout);
    }, [displayText, phase, currentTitleIndex]);

    const showCursor = phase === 'typing' || phase === 'wait' || phase === 'deleting' || phase === 'pause';

    return (
        <motion.div variants={fadeInUp} className="space-y-5 min-h-[220px]">
            <h1 className="text-white font-semibold text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] tracking-tight whitespace-pre-wrap min-h-[140px] flex items-end">
                <span className="relative">
                    {displayText}
                    {showCursor && (
                        <span className="font-normal animate-[pulse_0.8s_ease-in-out_infinite] inline-block ml-1 -translate-y-1 not-italic" style={{ color: '#F05050' }}>|</span>
                    )}
                </span>
            </h1>
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentTitleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white/70 text-lg md:text-xl font-light tracking-wide max-w-lg leading-relaxed break-keep"
                >
                    {TITLES[currentTitleIndex].sub}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
}
