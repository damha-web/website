"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHILOSOPHY_CONTENT = [
    {
        id: 1,
        subtitle: "경험의 차이",
        title: "실무자의 시선으로\n현장을 해석합니다",
        description: "마케팅 전문가 이전에 병원 실무자(간호사, 상담실장 등)였던 담하의 팀원들은 병원 내부의 프로세스와 환자의 심리를 누구보다 깊이 이해합니다.",
        stats: "전 구성원 현장 실무 경험 보유"
    },
    {
        id: 2,
        subtitle: "전략의 본질",
        title: "단순한 홍보가 아닌\n경영을 마케팅합니다",
        description: "데이터만 보는 마케팅은 반쪽짜리입니다. 우리는 원내 동선, 상담 화법, 사후 관리까지 아우르는 통합적 시각으로 병원의 지속 가능한 성장을 설계합니다.",
        stats: "마케팅-경영 통합 솔루션 제공"
    },
    {
        id: 3,
        subtitle: "신뢰의 증거",
        title: "성과로 입증하는\n담하의 파트너십",
        description: "현장을 아는 전문가의 전략은 결과가 다릅니다. 10년간 500여 개의 프로젝트가 증명한 담하만의 성공 공식은 오직 결과로 말합니다.",
        stats: "재의뢰율 95% 이상"
    }
];

export default function PhilosophySection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const handleHover = useCallback((index: number) => {
        if (!isMobile) setActiveIndex(index);
    }, [isMobile]);

    const handleClick = useCallback((index: number) => {
        if (isMobile) {
            setActiveIndex(prev => prev === index ? -1 : index);
        }
    }, [isMobile]);

    return (
        <section className="relative bg-secondary overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-screen">

                {/* Left: Full Image */}
                <motion.div
                    className="relative w-full lg:w-1/2 h-[40vh] lg:h-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src="/assets/images/code.jpg"
                        alt="Damha Philosophy"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 via-secondary/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />

                    {/* Quote overlay */}
                    <div className="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 lg:right-16">
                        <p className="text-white/50 text-xs tracking-[0.2em] font-montserrat uppercase mb-3">
                            Why Damha Works
                        </p>
                        <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6 break-keep">
                            담하가 만드는<br />
                            <span className="text-primary">결정적 차이</span>
                        </h2>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 lg:p-6 max-w-md">
                            <p className="text-white/90 text-base lg:text-lg font-medium leading-relaxed italic">
                                &ldquo;현장을 모르는 마케팅은<br />
                                전술일 뿐 전략이 될 수 없다&rdquo;
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Accordion */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-6 py-12 lg:px-16 lg:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-text-sub text-base lg:text-lg leading-relaxed mb-10 max-w-lg break-keep">
                            우리는 단순한 마케팅 대행사가 아닙니다.<br />
                            현장의 언어를 마케팅으로 번역하는 브랜드 파트너입니다.
                        </p>

                        {/* Accordion Items */}
                        <div className="border-t border-gray-200">
                            {PHILOSOPHY_CONTENT.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="border-b border-gray-200"
                                    onMouseEnter={() => handleHover(index)}
                                    onClick={() => handleClick(index)}
                                >
                                    {/* Header */}
                                    <div className={`flex items-start gap-5 py-6 lg:py-7 cursor-pointer transition-colors duration-300 ${activeIndex === index ? 'text-secondary' : 'text-gray-400 hover:text-secondary'}`}>
                                        <span className="text-sm font-montserrat font-bold mt-1 shrink-0">
                                            {String(item.id).padStart(2, '0')}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg lg:text-xl font-bold leading-snug break-keep">
                                                {item.title.replace('\n', ' ')}
                                            </h3>

                                            {/* Expandable content */}
                                            <AnimatePresence initial={false}>
                                                {activeIndex === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-text-sub text-sm lg:text-base leading-relaxed mt-3 break-keep">
                                                            {item.description}
                                                        </p>
                                                        <p className="text-primary text-sm font-bold mt-3 flex items-center gap-2">
                                                            <span className="w-6 h-px bg-primary" />
                                                            {item.stats}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Toggle indicator */}
                                        <motion.span
                                            className="text-lg mt-0.5 shrink-0 select-none"
                                            animate={{ rotate: activeIndex === index ? 45 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            +
                                        </motion.span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
