"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO_PREVIEWS } from "@/lib/portfolio-preview";
import { ArrowUpRight } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

export default function PortfolioPage() {
    const [filter, setFilter] = useState<string>("All");
    const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(PORTFOLIO_PREVIEWS.map((item) => item.category)))];

    // Filtered data
    const filteredItems = filter === "All"
        ? PORTFOLIO_PREVIEWS
        : PORTFOLIO_PREVIEWS.filter(item => item.category === filter);

    return (
        <main className="min-h-screen pt-32 pb-24 bg-white">
            <div className="container mx-auto px-6">

                {/* Hero Section of Portfolio */}
                <div className="max-w-4xl mb-16 relative z-10">
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
                        담하의 철학이 담긴 눈부신 결과물들을 카테고리별로 직접 확인해 보세요.
                    </motion.p>
                </div>

                {/* Filter Tabs + View Toggle */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold font-montserrat tracking-wide transition-all duration-300 ${filter === category
                                    ? "bg-secondary text-white shadow-lg shadow-secondary/20 scale-105"
                                    : "bg-white text-text-sub hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* View Mode Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="flex gap-2 bg-gray-100 p-1 rounded-full"
                    >
                        <button
                            onClick={() => setViewMode("masonry")}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${viewMode === "masonry" ? "bg-white text-secondary shadow-sm" : "text-text-sub"}`}
                        >
                            Masonry
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${viewMode === "grid" ? "bg-white text-secondary shadow-sm" : "text-text-sub"}`}
                        >
                            Grid
                        </button>
                    </motion.div>
                </div>

                {/* Portfolio Layout - Masonry or Grid */}
                <motion.div
                    layout
                    className={
                        viewMode === "masonry"
                            ? "columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    }
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => {
                            // Masonry: vary heights for visual interest
                            const aspectRatio = viewMode === "masonry"
                                ? index % 3 === 0 ? "[4/5]" : index % 3 === 1 ? "[3/4]" : "[1/1]"
                                : "[4/5]";

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        duration: 0.5,
                                        layout: { duration: 0.3 }
                                    }}
                                    className={`group relative ${viewMode === "masonry" ? "break-inside-avoid mb-8" : ""}`}
                                >
                                    <MagneticWrapper strength={0.1}>
                                        <Link href={`/portfolio/${item.slug}`} className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-3xl">
                                            <div className={`relative w-full aspect-${aspectRatio} rounded-3xl overflow-hidden bg-gray-100 shadow-md transition-all duration-500 group-hover:shadow-2xl`}>

                                            {/* Image with Zoom + Saturation Effect */}
                                            <motion.div
                                                className="absolute inset-0"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.7, ease: "easeOut" }}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </motion.div>

                                            {/* Color Overlay Transition */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-transparent to-primary/40 opacity-100 group-hover:opacity-0 transition-opacity duration-700 mix-blend-multiply" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Sticky Top Badge */}
                                            <div className="absolute top-6 left-6 z-20">
                                                <span className="inline-block bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-secondary font-montserrat shadow-sm border border-gray-100">
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Hover Content Details */}
                                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex flex-col justify-end">
                                                <p className="text-secondary/70 text-sm font-semibold mb-2 flex items-center gap-2">
                                                    <span className="w-4 h-px bg-secondary/30"></span> {item.client}
                                                </p>
                                                <h3 className="text-2xl font-bold text-secondary mb-4 leading-tight break-keep">
                                                    {item.title}
                                                </h3>

                                                {/* Explore CTA inside card */}
                                                <div className="flex items-center text-primary font-bold text-sm tracking-wide font-montserrat uppercase gap-2 group/btn">
                                                    View Case Study
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-colors">
                                                        <ArrowUpRight size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                    </MagneticWrapper>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-text-sub text-lg">해당 카테고리의 포트폴리오가 아직 준비 중입니다.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
