"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, Shield, Puzzle, Rocket } from "lucide-react";

const DIFFERENCES = [
    {
        title: "무에서 유 만들기",
        value: "브랜드 특화 경험",
        description: "브랜드의 첫인상을 빈 화면에서 구체적 웹 경험으로 변환합니다.",
        icon: Lightbulb,
    },
    {
        title: "구조 검증하기",
        value: "안전성",
        description: "기획부터 개발까지 모든 구조의 내구성을 강화합니다.",
        icon: Shield,
    },
    {
        title: "다양하게 설계하기",
        value: "유연한 솔루션",
        description: "실패도 더 나은 경험으로 이어지도록 최적의 UX를 탐색합니다.",
        icon: Puzzle,
    },
    {
        title: "새로움 추구하기",
        value: "혁신성",
        description: "차별화된 UX로 환자와 병원의 새로운 접점을 발굴합니다.",
        icon: Rocket,
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function DifferenceSection() {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    return (
        <section id="difference" className="py-24 md:py-32 bg-surface-light">
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
                        Difference
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight break-keep">
                        담하가 <span className="text-primary">다른</span> 4가지 이유
                    </h2>
                </motion.div>

                {/* Cards - 2x2 grid with flip effect */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16"
                >
                    {DIFFERENCES.map((diff, index) => {
                        const Icon = diff.icon;
                        return (
                            <motion.div
                                key={diff.title}
                                variants={cardVariants}
                                className="group [perspective:1000px] cursor-pointer"
                                onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
                            >
                                <div className={`relative w-full h-64 md:h-72 transition-transform duration-700 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] ${flippedIndex === index ? "[transform:rotateY(180deg)]" : ""}`}>
                                    {/* Front */}
                                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                                            <Icon size={32} className="text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">{diff.title}</h3>
                                        <span className="text-primary font-semibold text-sm">{diff.value}</span>
                                    </div>

                                    {/* Back */}
                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-secondary rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                                        <Icon size={28} className="text-primary mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-3">{diff.title}</h3>
                                        <p className="text-white/70 leading-relaxed break-keep">{diff.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Closing copy */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-lg md:text-xl text-text-sub max-w-2xl mx-auto break-keep"
                >
                    홈페이지 그 이상, <strong className="text-secondary">환자 유입 시스템</strong>을 만듭니다
                </motion.p>
            </div>
        </section>
    );
}
