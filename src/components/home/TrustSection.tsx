"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { SVGMasks } from "@/components/ui/svg-masks";

/**
 * TrustSection variants
 */
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function TrustSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <>
            <SVGMasks />
            <section ref={ref} className="py-24 bg-surface-alt overflow-hidden relative">
                {/* Decorative masked images in background */}
                <div className="absolute top-20 right-10 w-32 h-32 opacity-10 pointer-events-none hidden lg:block" style={{ clipPath: 'url(#pentagonMask)' }}>
                    <div className="w-full h-full bg-primary" />
                </div>
                <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 pointer-events-none hidden lg:block" style={{ clipPath: 'url(#squircleMask)' }}>
                    <div className="w-full h-full bg-secondary" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                        Our Strength
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-tight tracking-tight break-keep">
                        왜 <span className="text-primary">담하</span>와 함께 해야 할까요?
                    </h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {/* Item 1: 131+ Hospitals */}
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                        {/* Background decorative element */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl group-hover:bg-blue-100/50 transition-colors duration-500"></div>

                        {/* Graphic */}
                        <div className="h-28 mb-6 relative flex flex-col justify-end w-full">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span className="text-xs font-semibold text-gray-500">Portfolio</span>
                                </div>
                                <div className="flex items-center text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded-full">
                                    <ArrowUpRight size={10} className="mr-0.5" /> Growing
                                </div>
                            </div>
                            <div className="w-full h-12 relative overflow-hidden rounded-md">
                                <svg className="absolute bottom-0 w-full h-[150%] left-0" viewBox="0 0 100 40" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                                            <stop stopColor="#2563EB" stopOpacity="0.2" offset="0%" />
                                            <stop stopColor="#2563EB" stopOpacity="0" offset="100%" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0 40 L0 30 C 20 30, 40 10, 60 20 C 80 30, 95 10, 100 5 L100 40 Z" fill="url(#gradient1)" />
                                    <motion.path
                                        d="M0 30 C 20 30, 40 10, 60 20 C 80 30, 95 10, 100 5"
                                        fill="none"
                                        stroke="#2563EB"
                                        strokeWidth="2"
                                        strokeDasharray="150"
                                        className="stroke-primary"
                                        variants={{
                                            hidden: { strokeDashoffset: 150 },
                                            show: { strokeDashoffset: 0, transition: { duration: 1.5, ease: "easeOut", delay: 0.2 } }
                                        }}
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <span className="text-5xl font-bold font-montserrat text-secondary mb-3 block leading-none">
                                {inView ? <CountUp end={131} duration={2} /> : "0"}
                                <span className="text-primary">+</span>
                            </span>
                            <p className="text-lg font-bold text-text-main mb-1">병원 레퍼런스</p>
                            <p className="text-sm text-text-sub leading-relaxed">전국 규모의 압도적 성공 경험</p>
                        </div>
                    </motion.div>

                    {/* Item 2: 48+ Experts */}
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>

                        {/* Graphic */}
                        <div className="h-28 mb-6 relative flex flex-col justify-end w-full">
                            <div className="flex justify-between items-center mb-auto">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                                    <span className="text-xs font-semibold text-gray-500">Experts</span>
                                </div>
                            </div>
                            <div className="w-full flex items-end justify-between h-14 gap-1.5 px-1 relative z-10">
                                <motion.div className="w-full bg-blue-50 group-hover:bg-blue-100 rounded-t-sm transition-colors duration-300" variants={{ hidden: { height: 0 }, show: { height: "30%", transition: { duration: 0.6, delay: 0.1 } } }} />
                                <motion.div className="w-full bg-blue-100 group-hover:bg-blue-200 rounded-t-sm transition-colors duration-300" variants={{ hidden: { height: 0 }, show: { height: "45%", transition: { duration: 0.6, delay: 0.2 } } }} />
                                <motion.div className="w-full bg-blue-200 group-hover:bg-blue-300 rounded-t-sm transition-colors duration-300" variants={{ hidden: { height: 0 }, show: { height: "65%", transition: { duration: 0.6, delay: 0.3 } } }} />
                                <motion.div className="w-full bg-blue-300 group-hover:bg-blue-400 rounded-t-sm transition-colors duration-300" variants={{ hidden: { height: 0 }, show: { height: "85%", transition: { duration: 0.6, delay: 0.4 } } }} />
                                <motion.div className="w-full bg-primary rounded-t-sm relative group-hover:bg-accent transition-colors duration-300 shadow-md shadow-primary/20" variants={{ hidden: { height: 0 }, show: { height: "100%", transition: { duration: 0.6, delay: 0.5 } } }}>
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-bold text-primary">FULL</div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <span className="text-5xl font-bold font-montserrat text-secondary mb-3 block leading-none">
                                {inView ? <CountUp end={48} duration={2} /> : "0"}
                                <span className="text-primary">+</span>
                            </span>
                            <p className="text-lg font-bold text-text-main mb-1">정규직 전문가 그룹</p>
                            <p className="text-sm text-text-sub leading-relaxed">분야별 정예 인력의 원스톱 솔루션</p>
                        </div>
                    </motion.div>

                    {/* Item 3: 10yr Experience */}
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                        {/* Graphic */}
                        <div className="h-28 mb-6 relative flex flex-col w-full">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <span className="text-xs font-semibold text-gray-500">History</span>
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium font-montserrat group-hover:text-primary transition-colors">Since 2021</span>
                            </div>

                            <div className="relative w-full flex-1 flex items-center justify-center mt-2 group-hover:scale-105 transition-transform duration-500">
                                <svg className="w-[110%] max-w-[140px]" viewBox="0 0 100 50">
                                    <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="#f3f4f6" strokeWidth="10" strokeLinecap="round" />
                                    <motion.path
                                        d="M 10 45 A 40 40 0 0 1 90 45"
                                        fill="none"
                                        className="stroke-primary"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray="126"
                                        variants={{
                                            hidden: { strokeDashoffset: 126 },
                                            show: { strokeDashoffset: 126 - (126 * 0.95), transition: { duration: 1.5, ease: "easeOut", delay: 0.3 } }
                                        }}
                                    />
                                </svg>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-baseline gap-0.5">
                                    <span className="text-2xl font-bold text-secondary font-montserrat tracking-tighter">10</span><span className="text-xs font-bold text-primary">yr</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <span className="text-5xl font-bold font-montserrat text-secondary mb-3 block leading-none">
                                {inView ? <CountUp end={10} duration={2.5} /> : "0"}
                                <span className="text-primary">yr</span>
                            </span>
                            <p className="text-lg font-bold text-text-main mb-1">실무 필드 노하우</p>
                            <p className="text-sm text-text-sub leading-relaxed">현장의 언어로 소통하는 10년 경력</p>
                        </div>
                    </motion.div>

                    {/* Item 4: 95% Retention */}
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                        {/* Graphic */}
                        <div className="h-28 mb-6 relative flex flex-col w-full">
                            <div className="flex justify-between items-center mb-auto absolute top-0 left-0 w-full z-10">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full border border-primary"></div>
                                    <span className="text-xs font-semibold text-gray-500">Trust</span>
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-center h-full relative mt-2">
                                {/* Left node (Client) */}
                                <div className="absolute w-12 h-12 rounded-full border border-gray-200 left-[15%] flex items-center justify-center z-10 bg-white group-hover:-translate-x-1 group-hover:scale-105 transition-all duration-500 shadow-sm">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                {/* Right node (Expert) */}
                                <div className="absolute w-14 h-14 rounded-full shadow-md border-2 border-primary right-[15%] flex items-center justify-center z-20 bg-primary/5 group-hover:translate-x-1 group-hover:scale-105 transition-all duration-500">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center relative">
                                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"></div>
                                        <svg className="w-4 h-4 text-primary relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Connection Line */}
                                <svg className="w-full h-8 absolute top-1/2 -translate-y-1/2 z-0" preserveAspectRatio="none">
                                    <path d="M 30,16 Q 50,24 70,16" fill="none" className="stroke-gray-200 group-hover:stroke-primary/50 transition-colors duration-500" strokeWidth="2" strokeDasharray="4 4" />
                                    <motion.circle
                                        cx="50" cy="20" r="3"
                                        className="fill-primary"
                                        variants={{
                                            hidden: { opacity: 0, scale: 0 },
                                            show: { opacity: 1, scale: 1, transition: { delay: 0.6 } }
                                        }}
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <span className="text-5xl font-bold font-montserrat text-secondary mb-3 block leading-none">
                                {inView ? <CountUp end={95} duration={2} /> : "0"}
                                <span className="text-primary">%</span>
                            </span>
                            <p className="text-lg font-bold text-text-main mb-1">고객 재의뢰율</p>
                            <p className="text-sm text-text-sub leading-relaxed">압도적 파트너 만족도</p>
                        </div>
                    </motion.div>
                </motion.div>
                </div>
            </section>
        </>
    );
}
