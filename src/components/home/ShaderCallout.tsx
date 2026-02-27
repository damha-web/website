"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { customFadeInUp } from "@/lib/animation-variants";

const TypewriterCallout = ({ text1, text2 }: { text1: string, text2: string }) => {
    const [displayedText2, setDisplayedText2] = useState('');
    const [phase, setPhase] = useState<'typing' | 'wait' | 'deleting' | 'pause'>('typing');

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (phase === 'typing') {
            if (displayedText2.length < text2.length) {
                timeout = setTimeout(() => setDisplayedText2(text2.slice(0, displayedText2.length + 1)), 100);
            } else {
                timeout = setTimeout(() => setPhase('wait'), 0);
            }
        } else if (phase === 'wait') {
            timeout = setTimeout(() => setPhase('deleting'), 4000); // 4초 대기
        } else if (phase === 'deleting') {
            if (displayedText2.length > 0) {
                timeout = setTimeout(() => setDisplayedText2(text2.slice(0, displayedText2.length - 1)), 40);
            } else {
                timeout = setTimeout(() => setPhase('pause'), 0);
            }
        } else if (phase === 'pause') {
            timeout = setTimeout(() => setPhase('typing'), 500);
        }

        return () => clearTimeout(timeout);
    }, [displayedText2, phase, text2]);

    const showCursor2 = phase === 'typing' || phase === 'wait' || phase === 'deleting' || phase === 'pause';

    return (
        <>
            {text1}
            <br />
            <span className="relative inline-block text-left">
                {/* 보이지 않는 원본 테스트 - 레이아웃 공간 차지 유지 역할 */}
                <span className="opacity-0 font-light italic pointer-events-none pr-[1.2em]">
                    {text2}
                </span>

                {/* 실제 타이핑 텍스트 및 커서 */}
                <span className="absolute left-0 top-0 font-light italic whitespace-nowrap" style={{ color: '#F05050' }}>
                    {displayedText2}
                    {showCursor2 && (
                        <span className="font-normal animate-[pulse_0.8s_ease-in-out_infinite] inline-block ml-1 -translate-y-1 not-italic">|</span>
                    )}
                </span>
            </span>
            <span>에서 완성됩니다</span>
        </>
    );
};

export default function ShaderCallout() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 md:py-40 flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
        >
            {/* 격자 배경 패턴 */}
            <div className="absolute inset-0 w-full h-full bg-transparent bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

            {/* 콘텐츠 */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={customFadeInUp(0.8)}
                className="container mx-auto px-6 text-center relative z-10"
            >
                <div className="relative mx-auto max-w-4xl border border-gray-200/60 bg-white/60 backdrop-blur-sm py-16 px-8 md:px-12 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]">
                    {/* Corner Plus 아이콘 장식 */}
                    <Plus strokeWidth={3} className="text-primary/40 absolute -left-4 -top-4 h-8 w-8" />
                    <Plus strokeWidth={3} className="text-primary/40 absolute -right-4 -top-4 h-8 w-8" />
                    <Plus strokeWidth={3} className="text-primary/40 absolute -left-4 -bottom-4 h-8 w-8" />
                    <Plus strokeWidth={3} className="text-primary/40 absolute -right-4 -bottom-4 h-8 w-8" />

                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-white/80 backdrop-blur-md mb-6 shadow-sm">
                        <span className="text-primary text-sm font-bold tracking-widest">WHY DAMHA?</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-secondary max-w-4xl mx-auto leading-tight mb-8 break-keep min-h-[96px] md:min-h-[120px] lg:min-h-[168px]">
                        <TypewriterCallout text1="특별함은" text2="한 끗의 디테일" />
                    </h2>

                    {/* 상태 인디케이터 */}
                    <div className="flex items-center justify-center gap-1 mb-6">
                        <span className="relative flex h-3 w-3 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        <p className="text-xs text-green-600 font-medium">프로젝트 상담 가능</p>
                    </div>

                    <p className="text-lg text-text-sub max-w-2xl mx-auto font-light leading-relaxed mb-10 break-keep">
                        당신의 비즈니스를 최고로 만들기 위해 가장 진보된 마케팅 솔루션을 제공합니다.<br />
                        수면 아래에서 끊임없이 움직이는 담하의 노력을 경험하세요.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 rounded-xl bg-primary text-white text-lg font-medium transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/30 hover:shadow-primary/50"
                    >
                        프로젝트 문의하기
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
