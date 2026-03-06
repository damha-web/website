"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PHILOSOPHY_CONTENT = [
    {
        id: 1,
        subtitle: "경험의 차이",
        title: "실무자의 시선으로\n현장을 해석합니다",
        description: "마케팅 전문가 이전에 병원 실무자(간호사, 상담실장 등)였던 담하의 팀원들은 병원 내부의 프로세스와 환자의 심리를 누구보다 깊이 이해합니다.",
        stats: "주요 구성원 현장 실무 경험 보유"
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

// Noise texture for premium analog feel
const noiseTextureUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E";

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

    // Title text for stagger animation
    const sectionTitle = "Why Damha Works";
    const titleLetters = Array.from(sectionTitle);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
        }),
    };

    const childVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, damping: 12, stiffness: 200 },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: { type: "spring" as const, damping: 12, stiffness: 200 },
        },
    };

    return (
        <section className="relative bg-secondary overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-screen">

                {/* Left: Full Image with Ken Burns & Glassmorphism */}
                <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto overflow-hidden">
                    {/* Background Noise Layer */}
                    <div
                        className="absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay pointer-events-none"
                        style={{ backgroundImage: `url("${noiseTextureUrl}")` }}
                    />

                    {/* Ken Burns Image */}
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        initial={{ scale: 1.1, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <motion.div
                            className="w-full h-full"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                        >
                            <Image
                                src="/assets/images/pc001007479.jpg"
                                alt="Damha Philosophy"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                    {/* Multi-layered Gradient Overlay for Depth */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />

                    {/* Overlay Content */}
                    <div className="absolute bottom-8 left-6 right-6 lg:bottom-16 lg:left-12 lg:right-12 z-20 flex flex-col justify-end h-full pointer-events-none">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            className="flex overflow-hidden mb-3"
                        >
                            {titleLetters.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    variants={childVariants}
                                    className="text-white/60 text-xs lg:text-sm tracking-[0.2em] font-montserrat uppercase shadow-black/50 drop-shadow-sm"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Glow Title Effect */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-8 break-keep drop-shadow-lg"
                        >
                            담하가 만드는<br />
                            <span className="text-primary drop-shadow-[0_0_15px_rgba(214,0,0,0.5)]">결정적 차이</span>
                        </motion.h2>

                        {/* Premium Glassmorphism Quote Card */}
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            whileInView={{ opacity: 1, backdropFilter: "blur(12px)" }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 max-w-md shadow-2xl"
                        >
                            {/* Accent highlight bar */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20" />
                            {/* Shine effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />

                            <p className="relative z-10 text-white/90 text-sm lg:text-base leading-relaxed break-keep">
                                <span className="font-light">&quot;현장을 모르는 </span>
                                <span className="font-bold border-b border-primary/50 pb-0.5">마케팅은 전술</span><span className="font-light">일 뿐 </span><br className="hidden sm:block" />
                                <span className="font-extrabold text-white text-lg lg:text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">전략이 될 수 없다&quot;</span>
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right: Accordion Micro-interactions */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center bg-[#FAFAFA] px-6 py-16 lg:px-20 lg:py-24">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl mx-auto w-full"
                    >
                        <div className="mb-12 lg:mb-16 max-w-lg break-keep">
                            <h3 className="text-lg lg:text-xl font-bold leading-relaxed text-secondary/80">
                                우리는 단순한 마케팅 대행사가 아닙니다.<br />

                                <span className="block mt-3 lg:mt-4 text-2xl lg:text-3xl leading-snug text-secondary">
                                    현장의 언어를 마케팅으로 번역하는 <br className="hidden lg:block" />
                                    <span className="relative inline-block mt-1 mr-1">
                                        <span className="relative z-10 text-primary font-black tracking-tight">브랜드 파트너</span>
                                        {/* 형광펜 하이라이트 애니메이션 */}
                                        <motion.span
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                            className="absolute bottom-1 lg:bottom-2 left-0 right-0 h-3 lg:h-4 bg-primary/20 origin-left z-0"
                                        />
                                    </span>
                                    입니다.
                                </span>
                            </h3>
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: "3rem", opacity: 1 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="h-1 bg-gradient-to-r from-primary to-transparent mt-5 lg:mt-8 rounded-full"
                            />
                        </div>

                        {/* Accordion List */}
                        <div className="relative">
                            {PHILOSOPHY_CONTENT.map((item, index) => {
                                const isActive = activeIndex === index;

                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        className={`group relative border-b border-gray-200 transition-all duration-500 overflow-hidden ${isActive ? 'bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border-transparent rounded-xl mb-4 z-10' : 'hover:bg-gray-50/50'
                                            }`}
                                        onMouseEnter={() => handleHover(index)}
                                        onClick={() => handleClick(index)}
                                    >
                                        {/* Active State Left Accent */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "100%" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="absolute left-0 top-0 w-1 bg-primary"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* Header */}
                                        <div className={`flex items-start gap-4 lg:gap-6 px-4 lg:px-6 py-6 lg:py-8 cursor-pointer transition-colors duration-300 relative z-10`}>
                                            <span className={`text-sm lg:text-base font-montserrat font-bold mt-1 shrink-0 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-300 group-hover:text-gray-400'}`}>
                                                {String(item.id).padStart(2, '0')}
                                            </span>

                                            <div className="flex-1 min-w-0">
                                                <h3 className={`text-lg lg:text-2xl font-bold leading-snug break-keep transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-gray-400 group-hover:text-secondary'}`}>
                                                    {item.title.split('\n').map((line, i) => (
                                                        <span key={i} className="block">{line}</span>
                                                    ))}
                                                </h3>

                                                {/* Expandable Content with Text Fade Up */}
                                                <AnimatePresence initial={false}>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                            className="overflow-hidden"
                                                        >
                                                            <motion.div
                                                                initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
                                                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                                                transition={{ duration: 0.4, delay: 0.1 }}
                                                                className="pt-4"
                                                            >
                                                                <p className="text-text-sub text-sm lg:text-base leading-relaxed break-keep font-medium">
                                                                    {item.description}
                                                                </p>

                                                                {/* Stats Badge */}
                                                                <div className="mt-5 inline-flex items-center gap-2 bg-red-50 text-primary px-3 py-1.5 rounded-full text-xs font-bold shrink-0">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                                    {item.stats}
                                                                </div>
                                                            </motion.div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Toggle Indicator */}
                                            <motion.div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-colors duration-300 ${isActive ? 'border-primary text-primary bg-primary/5' : 'border-gray-200 text-gray-300 group-hover:border-gray-300 group-hover:text-gray-400'
                                                    }`}
                                                animate={{ rotate: isActive ? 45 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
