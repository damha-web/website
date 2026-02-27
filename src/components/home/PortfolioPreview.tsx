"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_PREVIEWS } from "@/lib/portfolio-preview";
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion";

export default function PortfolioPreview() {
    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden relative font-sans">
            <div className="container mx-auto px-6">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-16 xl:gap-8">

                    {/* Left Side: Text Content */}
                    <motion.div
                        className="w-full xl:w-5/12 text-left"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                            Our Works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.2] tracking-tight mb-6 break-keep">
                            성공의 증명
                        </h2>
                        <p className="text-lg text-text-sub max-w-lg mb-10 leading-relaxed break-keep">
                            실제 데이터와 성과로 증명된 담하의 포트폴리오.<br className="hidden md:block" />
                            단순한 디자인을 넘어 브랜딩과 마케팅의 본질을 꿰뚫는<br className="hidden md:block" />
                            압도적인 결과물을 확인해 보세요.
                        </p>

                        <div className="mb-16 xl:mb-0">
                            <Link
                                href="/portfolio"
                                className="inline-flex items-center gap-3 bg-secondary text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-primary transition-all duration-300 group mb-12"
                            >
                                전체 포트폴리오 보기
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Infinite Client Ticker Slider */}
                            <div className="relative w-full overflow-hidden max-w-sm">
                                <p className="text-secondary/50 font-bold text-xs tracking-[0.2em] font-montserrat uppercase mb-4 pl-1">
                                    Trusted By
                                </p>

                                <div className="absolute left-0 top-6 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                                <div className="absolute right-0 top-6 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                                <motion.div
                                    className="flex w-max whitespace-nowrap opacity-60"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                                >
                                    {[...Array(2)].map((_, idx) => (
                                        <div key={idx} className="flex gap-6 lg:gap-8 px-3 lg:px-4 items-center">
                                            <span className="font-bold text-base lg:text-lg text-secondary">서울대학교병원</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                            <span className="font-bold text-base lg:text-lg text-secondary">연세세브란스</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                            <span className="font-bold text-base lg:text-lg text-secondary">고려대학교의료원</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                            <span className="font-bold text-base lg:text-lg text-secondary">가톨릭성모병원</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                            <span className="font-bold text-base lg:text-lg text-secondary">서울아산병원</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                            <span className="font-bold text-base lg:text-lg text-secondary">삼성서울병원</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Image Accordion */}
                    <motion.div
                        className="w-full xl:w-7/12"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        {/* Using the first 5 portfolio items optimally for the accordion UI */}
                        <InteractiveImageAccordion items={PORTFOLIO_PREVIEWS.slice(0, 5)} />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
