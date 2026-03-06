"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_CLIENTS } from "@/data/clients";
import { ClientIconCloud } from "@/components/ui/client-icon-cloud";

export default function PortfolioPreview() {
    // 애니메이션 변수 설정: 부모 컨테이너(stagger), 자식 요소(fade-up)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
    };

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden relative font-sans">
            <div className="container mx-auto px-6">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-16 xl:gap-8">

                    {/* Left Side: Text Content */}
                    <motion.div
                        className="w-full xl:w-5/12 text-left"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-100px", amount: 0.2 }}
                    >
                        <motion.span
                            variants={itemVariants}
                            className="text-primary font-bold tracking-[0.3em] text-sm font-montserrat uppercase mb-6 block"
                        >
                            OUR PARTNERS & WORKS
                        </motion.span>

                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-[54px] font-bold text-secondary leading-[1.3] tracking-tight mb-8 break-keep"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF3B3B]">숫자와 혁신</span>으로 증명하는<br />
                            압도적 성공의 레퍼런스
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-text-sub max-w-lg mb-12 leading-relaxed break-keep"
                        >
                            담하는 단순한 에이전시를 넘어, 데이터와 성과로 성공을 증명하는 전략적 파트너입니다. 50+ 이상의 종합병원과 브랜드가 경험한 실질적인 성장, 그리고 담하를 거쳐간 수많은 클라이언트들이 그 결과를 직접 증명하고 있습니다.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mb-0">
                            <Link
                                href="/portfolio"
                                className="inline-flex items-center gap-3 bg-secondary text-white font-semibold px-8 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(214,0,0,0.3)] hover:bg-primary transition-all duration-300 group overflow-hidden relative"
                            >
                                {/* Button Hover Red Glow Effect backdrop */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                                <span className="relative z-10 block">성공 사례 확인하기</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Interactive Client Cloud */}
                    <motion.div
                        className="w-full xl:w-7/12 flex items-center justify-center min-h-[400px] md:min-h-[500px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, margin: "-100px", amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    >
                        {/* 더 넓은 영역을 가지도록 컨테이너 추가 */}
                        <div className="w-full max-w-[600px] aspect-square rounded-[3rem] bg-gradient-to-b from-gray-50/50 to-white flex items-center justify-center">
                            <ClientIconCloud clients={FEATURED_CLIENTS} />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
