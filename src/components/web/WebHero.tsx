"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animation-variants";
import { ArrowRight, Monitor } from "lucide-react";
import Link from "next/link";

export default function WebHero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1F1F1F]">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F] via-[#1F1F1F]/95 to-[#D60000]/10" />

            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }} />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1280px] px-6 mx-auto py-32 md:py-40">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div variants={fadeInUp} className="mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium">
                            <Monitor size={16} />
                            웹제작부
                        </span>
                    </motion.div>

                    {/* Main copy */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] tracking-tight mb-8 break-keep"
                    >
                        당신의 병원 홈페이지,
                        <br />
                        <span className="text-primary">새로운 관점</span>에서
                        <br className="md:hidden" /> 만들겠습니다.
                    </motion.h1>

                    {/* Sub copy */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed break-keep"
                    >
                        기획부터 운영까지, 웹과 관련된 모든 것을 책임지는
                        <br className="hidden md:block" />
                        올인원 파트너
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="#contact"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all duration-300 text-lg"
                        >
                            프로젝트 문의하기
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#portfolio"
                            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-lg"
                        >
                            포트폴리오 보기
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Scroll</span>
                </motion.div>
            </motion.div>
        </section>
    );
}
