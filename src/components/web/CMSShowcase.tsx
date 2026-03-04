"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CMS_FEATURES } from "@/data/cms-features";
import { Check } from "lucide-react";
import Image from "next/image";

export default function CMSShowcase() {
    const [activeTab, setActiveTab] = useState(0);
    const activeFeature = CMS_FEATURES[activeTab];

    return (
        <section id="cms" className="py-24 md:py-32 bg-[#1F1F1F]">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                        CMS
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 break-keep">
                        담하 <span className="text-primary">관리 시스템</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto break-keep">
                        &ldquo;이 정도면 나도 관리할 수 있겠다&rdquo; — 직관적인 병원 전용 CMS
                    </p>
                </motion.div>

                {/* Mobile Tab Select */}
                <div className="md:hidden mb-10 mt-6 relative z-10">
                    <div className="relative">
                        <select
                            value={activeTab}
                            onChange={(e) => setActiveTab(Number(e.target.value))}
                            className="w-full bg-[#1A1A1A] text-white px-4 py-3.5 rounded-xl border border-white/20 appearance-none outline-none focus:border-primary/50 transition-colors shadow-2xl"
                        >
                            {CMS_FEATURES.map((feature, index) => (
                                <option key={feature.id} value={index}>
                                    {feature.tab}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Desktop Tab Navigation */}
                <div className="hidden md:block mb-10 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 min-w-max justify-center">
                        {CMS_FEATURES.map((feature, index) => (
                            <button
                                key={feature.id}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === index
                                        ? "bg-primary text-white"
                                        : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
                                    }`}
                            >
                                {feature.tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFeature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    >
                        {/* Left - Screenshot */}
                        <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden aspect-[4/3] relative">
                            <Image
                                src={`/assets/images/cms/${activeFeature.id}.png`}
                                alt={activeFeature.title}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Right - Feature description */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {activeFeature.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed break-keep">
                                    {activeFeature.description}
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {activeFeature.highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-primary" />
                                        </div>
                                        <span className="text-white/80">{highlight}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4">
                                <span className="text-xs text-white/30 font-montserrat uppercase tracking-wider">
                                    {activeTab + 1} / {CMS_FEATURES.length}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
