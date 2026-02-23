"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Briefcase, TrendingUp, ArrowUpRight } from "lucide-react";

/**
 * Hero animation variants
 */
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Delay between each child animation
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const, // Custom easing for smooth spring-like feel
        },
    },
};

const floatingVariants1 = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};

const floatingVariants2 = {
    animate: {
        y: [0, 15, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};

const floatingVariants3 = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};

const TypewriterHeadline = ({ text1, text2 }: { text1: string, text2: string }) => {
    const [displayedText1, setDisplayedText1] = useState('');
    const [displayedText2, setDisplayedText2] = useState('');
    const [phase, setPhase] = useState<'text1' | 'pause1' | 'text2' | 'wait' | 'delete2' | 'pause2' | 'delete1' | 'restart'>('text1');

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (phase === 'text1') {
            if (displayedText1.length < text1.length) {
                timeout = setTimeout(() => setDisplayedText1(text1.slice(0, displayedText1.length + 1)), 100);
            } else {
                setPhase('pause1');
            }
        } else if (phase === 'pause1') {
            timeout = setTimeout(() => setPhase('text2'), 200);
        } else if (phase === 'text2') {
            if (displayedText2.length < text2.length) {
                timeout = setTimeout(() => setDisplayedText2(text2.slice(0, displayedText2.length + 1)), 100);
            } else {
                setPhase('wait');
            }
        } else if (phase === 'wait') {
            timeout = setTimeout(() => setPhase('delete2'), 4000); // 4초 동안 완성된 문장 보여줌
        } else if (phase === 'delete2') {
            if (displayedText2.length > 0) {
                timeout = setTimeout(() => setDisplayedText2(text2.slice(0, displayedText2.length - 1)), 40); // 지우는 속도는 더 빠르게
            } else {
                setPhase('pause2');
            }
        } else if (phase === 'pause2') {
            timeout = setTimeout(() => setPhase('delete1'), 100);
        } else if (phase === 'delete1') {
            if (displayedText1.length > 0) {
                timeout = setTimeout(() => setDisplayedText1(text1.slice(0, displayedText1.length - 1)), 40);
            } else {
                setPhase('restart');
            }
        } else if (phase === 'restart') {
            timeout = setTimeout(() => setPhase('text1'), 500); // 모두 지운 후 0.5초 뒤 타이핑 다시 시작
        }

        return () => clearTimeout(timeout);
    }, [displayedText1, displayedText2, phase, text1, text2]);

    const showCursor1 = phase === 'text1' || phase === 'pause1' || phase === 'delete1' || phase === 'restart';
    const showCursor2 = phase === 'text2' || phase === 'wait' || phase === 'delete2' || phase === 'pause2';

    return (
        <>
            {displayedText1}
            {showCursor1 && <span className="text-primary font-light animate-[pulse_0.8s_ease-in-out_infinite] inline-block ml-1 -translate-y-1">|</span>}
            <br />
            {displayedText2}
            {showCursor2 && <span className="text-primary font-light animate-[pulse_0.8s_ease-in-out_infinite] inline-block ml-1 -translate-y-1">|</span>}
        </>
    );
};

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen pt-32 pb-20 lg:py-0 lg:h-screen lg:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#FAFAFA] text-[#191919]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 right-[10%] w-[30vw] h-[30vw] min-w-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[30%] w-[25vw] h-[25vw] min-w-[250px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">

                    {/* Left side Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="w-full lg:w-[45%] flex flex-col items-start text-left"
                    >
                        {/* Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-secondary mb-6 leading-[1.15] tracking-tight max-w-2xl break-keep min-h-[120px] md:min-h-[140px] lg:min-h-[170px]"
                        >
                            <TypewriterHeadline text1="당신의 성공이" text2="우리의 레퍼런스" />
                        </motion.h1>

                        {/* Subcopy */}
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-sub max-w-lg mb-10 leading-relaxed font-light break-keep">
                            병원 특화 브랜딩부터 마케팅, 컨설팅까지.<br />
                            차원이 다른 성과를 만들어내는 프리미엄 에이전시.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Link
                                href="/portfolio"
                                className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-medium rounded-xl hover:bg-accent transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 text-center"
                            >
                                포트폴리오
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-text-main text-lg font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 shadow-sm"
                            >
                                서비스 문의
                            </Link>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div variants={itemVariants} className="mt-16 flex items-center gap-6 sm:gap-12 w-full sm:w-auto">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0">
                                    <Users size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-secondary">150<span className="text-primary">+</span></p>
                                    <p className="text-sm text-text-sub whitespace-nowrap">파트너 병원</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0">
                                    <Briefcase size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-secondary">4.5<span className="text-primary">K</span></p>
                                    <p className="text-sm text-text-sub whitespace-nowrap">누적 프로젝트</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Mobile Images (Compact Collage - Visible only on mobile/tablet screens) */}
                    <div className="w-full h-[400px] sm:h-[500px] relative mt-12 block lg:hidden">
                        {/* Image 1: Main Top Right */}
                        <motion.div
                            variants={floatingVariants1}
                            animate="animate"
                            className="absolute top-0 right-0 w-[60%] h-[55%] rounded-3xl overflow-hidden border border-white shadow-xl z-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="w-full h-full bg-gray-100"
                            >
                                <img src="/assets/images/b47863c4c7.jpg" alt="병원 마케팅 사례" className="w-full h-full object-cover" />
                            </motion.div>
                        </motion.div>

                        {/* Data Card 1: Bottom Left (Mobile) */}
                        <motion.div
                            variants={floatingVariants3}
                            animate="animate"
                            className="absolute bottom-0 left-0 w-[55%] h-[50%] rounded-[2rem] overflow-hidden border border-white shadow-xl z-30"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="w-full h-full bg-white p-4 sm:p-5 flex flex-col items-center justify-center gap-2 sm:gap-4"
                            >
                                <div className="flex w-full justify-between items-center mb-1">
                                    <p className="font-semibold text-gray-800 text-[11px] sm:text-sm">신규 환자 유입</p>
                                    <span className="text-[10px] sm:text-xs text-green-600 bg-green-50 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center font-bold">
                                        <ArrowUpRight size={10} className="mr-0.5" /> 24%
                                    </span>
                                </div>
                                <div className="relative w-20 h-20 sm:w-28 sm:h-28">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className="text-primary" strokeDasharray="75, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <p className="text-base sm:text-xl font-bold text-gray-800">4.3K</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Data Card 2: Middle Center Small (Mobile) */}
                        <motion.div
                            variants={floatingVariants2}
                            animate="animate"
                            className="absolute top-[35%] left-[25%] w-[45%] h-[40%] rounded-2xl overflow-hidden border border-white shadow-lg z-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="w-full h-full bg-white p-3 sm:p-4 flex flex-col justify-between items-start"
                            >
                                <div className="flex items-center gap-2 mb-1 w-full">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <TrendingUp size={14} className="text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">평균 ROAS</p>
                                        <p className="text-sm sm:text-lg font-bold text-gray-900 leading-none">340%</p>
                                    </div>
                                </div>
                                <div className="w-full flex items-end justify-between h-[50%] gap-1 sm:gap-2 mt-auto">
                                    <div className="w-full bg-blue-100 rounded-t-sm h-[40%]"></div>
                                    <div className="w-full bg-blue-200 rounded-t-sm h-[60%]"></div>
                                    <div className="w-full bg-blue-300 rounded-t-sm h-[50%]"></div>
                                    <div className="w-full bg-blue-400 rounded-t-sm h-[80%]"></div>
                                    <div className="w-full bg-blue-600 rounded-t-sm h-[100%]"></div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right side Images (Floating - Visible only on Desktop) */}
                    <div className="w-full lg:w-[55%] relative h-[500px] lg:h-[700px] hidden lg:block">
                        {/* Image 1: Main Top Right */}
                        <motion.div
                            variants={floatingVariants1}
                            animate="animate"
                            className="absolute top-[5%] right-[5%] w-[55%] h-[45%] rounded-3xl overflow-hidden border border-white shadow-2xl z-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="w-full h-full bg-gray-100"
                            >
                                <img src="/assets/images/b47863c4c7.jpg" alt="병원 마케팅 사례" className="w-full h-full object-cover" />
                            </motion.div>
                        </motion.div>

                        {/* Data Card 2: Middle Right Small (Desktop) */}
                        <motion.div
                            variants={floatingVariants2}
                            animate="animate"
                            className="absolute top-[45%] right-[-5%] w-[45%] h-[40%] rounded-3xl overflow-hidden border border-white shadow-xl z-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="w-full h-full bg-white p-5 lg:p-6 flex flex-col justify-between items-start"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <TrendingUp size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs lg:text-sm text-gray-500 font-medium">캠페인 평균 ROAS</p>
                                        <p className="text-xl lg:text-2xl font-bold text-gray-900 leading-none mt-1">340%</p>
                                    </div>
                                </div>
                                <div className="w-full flex items-end justify-between h-[45%] gap-2 mt-auto">
                                    <div className="w-full bg-blue-100 rounded-t-md h-[40%]"></div>
                                    <div className="w-full bg-blue-200 rounded-t-md h-[60%]"></div>
                                    <div className="w-full bg-blue-300 rounded-t-md h-[50%]"></div>
                                    <div className="w-full bg-blue-400 rounded-t-md h-[80%]"></div>
                                    <div className="w-full bg-blue-600 rounded-t-md h-[100%]"></div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Data Card 3: Bottom Left (Desktop) */}
                        <motion.div
                            variants={floatingVariants3}
                            animate="animate"
                            className="absolute bottom-[5%] left-[5%] w-[48%] h-[42%] rounded-[2rem] overflow-hidden border border-white shadow-2xl z-30"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="w-full h-full bg-white p-6 lg:p-8 flex flex-col items-center justify-center gap-4"
                            >
                                <div className="flex w-full justify-between items-center mb-2">
                                    <p className="font-semibold text-gray-800 text-sm lg:text-base">월간 신규 환자 유입</p>
                                    <span className="text-xs lg:text-sm text-green-600 bg-green-50 px-2 lg:px-3 py-1 rounded-full flex items-center font-bold">
                                        <ArrowUpRight size={14} className="mr-1" /> 24%
                                    </span>
                                </div>
                                <div className="relative w-28 h-28 lg:w-32 lg:h-32">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className="text-primary" strokeDasharray="75, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <p className="text-2xl lg:text-3xl font-bold text-gray-800">4.3K</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>

        </section>
    );
}
