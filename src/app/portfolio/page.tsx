"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-preview";

export default function PortfolioPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-white">
            <div className="container mx-auto px-6">

                {/* Hero Section */}
                <div className="max-w-4xl mb-20 relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block"
                    >
                        Our Works
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-secondary tracking-tight mb-8 leading-tight break-keep"
                    >
                        데이터와 전략이 빚어낸 <br />
                        <span className="text-secondary/70">성공적인 이야기들.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-text-sub max-w-2xl leading-relaxed break-keep"
                    >
                        브랜딩부터 디지털 마케팅, 그리고 오프라인 공간의 경영 통합 솔루션까지.
                        담하의 철학이 담긴 카테고리별 핵심 실적을 확인해 보세요.
                    </motion.p>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {PORTFOLIO_CATEGORIES.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="group relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] cursor-default"
                        >
                            {/* Background Image */}
                            <Image
                                src={cat.image}
                                alt={cat.category}
                                fill
                                className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/50 to-secondary/20 group-hover:from-secondary/90 group-hover:via-secondary/40 transition-all duration-500" />

                            {/* Category Badge */}
                            <div className="absolute top-6 left-6 z-20">
                                <span className="inline-block bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-secondary font-montserrat shadow-sm border border-gray-100">
                                    {cat.category}
                                </span>
                            </div>

                            {/* Stats Badge */}
                            <div className="absolute top-6 right-6 z-20">
                                <span className="inline-flex items-center gap-1.5 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                                    <TrendingUp size={12} />
                                    {cat.stats}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight break-keep whitespace-pre-line">
                                    {cat.title}
                                </h3>
                                <p className="text-white/70 text-sm font-medium mb-4">
                                    {cat.subtitle}
                                </p>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                                    <span className="text-white/90 text-sm font-semibold">{cat.highlight}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center border-t border-gray-200 pt-20"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-4 break-keep leading-tight">
                        귀사의 비즈니스도 성공 스토리의 <br className="hidden md:block" />주인공이 될 수 있습니다.
                    </h3>
                    <p className="text-text-sub text-lg mb-8 max-w-xl mx-auto">
                        131개 이상의 의료기관이 선택한 담하의 통합 솔루션을 경험해 보세요.
                    </p>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
                    >
                        서비스 알아보기
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
