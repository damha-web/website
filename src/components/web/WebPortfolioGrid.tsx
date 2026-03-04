"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { WEB_PORTFOLIO, GRADE_FILTERS, DEPT_FILTERS } from "@/data/web-portfolio";
import type { WebGrade, WebPortfolioItem } from "@/data/web-portfolio";
import { ExternalLink, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 },
    },
};

function GradeBadge({ grade }: { grade: WebGrade }) {
    const colors: Record<WebGrade, string> = {
        LITE: "bg-blue-50 text-blue-600 border-blue-200",
        BASIC: "bg-green-50 text-green-600 border-green-200",
        STANDARD: "bg-purple-50 text-purple-600 border-purple-200",
        "별도협의": "bg-amber-50 text-amber-600 border-amber-200",
    };
    return (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colors[grade]}`}>
            {grade}
        </span>
    );
}

function PortfolioModal({
    item,
    onClose,
}: {
    item: WebPortfolioItem;
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Thumbnail */}
                <div className="w-full aspect-video bg-gray-100 rounded-t-3xl relative overflow-hidden">
                    <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 640px"
                    />
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <GradeBadge grade={item.grade} />
                        <span className="text-sm text-text-sub">{item.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-secondary mb-2">{item.name}</h3>

                    <div className="flex items-center gap-2 text-sm text-text-sub mb-4">
                        <ExternalLink size={14} />
                        <span>{item.url}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {item.keywords.map((kw) => (
                            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-text-sub">
                                {kw}
                            </span>
                        ))}
                    </div>

                    <Link
                        href="#contact"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all group"
                    >
                        이런 사이트가 필요하신가요?
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function WebPortfolioGrid() {
    const [gradeFilter, setGradeFilter] = useState<WebGrade | "ALL">("ALL");
    const [deptFilter, setDeptFilter] = useState<string | "ALL">("ALL");
    const [selectedItem, setSelectedItem] = useState<WebPortfolioItem | null>(null);

    const filtered = useMemo(() => {
        return WEB_PORTFOLIO.filter((item) => {
            const gradeMatch = gradeFilter === "ALL" || item.grade === gradeFilter;
            const deptMatch =
                deptFilter === "ALL" ||
                item.departments.some((d) => d === deptFilter);
            return gradeMatch && deptMatch;
        });
    }, [gradeFilter, deptFilter]);

    return (
        <section id="portfolio" className="py-24 md:py-32 bg-surface-light">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight break-keep">
                        <span className="text-primary">15</span>개의 검증된 결과물
                    </h2>
                </motion.div>

                {/* Filters */}
                <div className="mb-10 space-y-4">
                    {/* Grade filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setGradeFilter("ALL")}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                gradeFilter === "ALL"
                                    ? "bg-secondary text-white"
                                    : "bg-gray-100 text-text-sub hover:bg-gray-200"
                            }`}
                        >
                            ALL
                        </button>
                        {GRADE_FILTERS.map((grade) => (
                            <button
                                key={grade}
                                onClick={() => setGradeFilter(grade)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                    gradeFilter === grade
                                        ? "bg-secondary text-white"
                                        : "bg-gray-100 text-text-sub hover:bg-gray-200"
                                }`}
                            >
                                {grade}
                            </button>
                        ))}
                    </div>

                    {/* Department filter */}
                    <div className="flex flex-wrap gap-2 justify-center overflow-x-auto">
                        <button
                            onClick={() => setDeptFilter("ALL")}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                deptFilter === "ALL"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-gray-50 text-text-sub hover:bg-gray-100"
                            }`}
                        >
                            전체
                        </button>
                        {DEPT_FILTERS.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setDeptFilter(dept)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                    deptFilter === dept
                                        ? "bg-primary/10 text-primary"
                                        : "bg-gray-50 text-text-sub hover:bg-gray-100"
                                }`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                layout
                                className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                                onClick={() => setSelectedItem(item)}
                            >
                                {/* Thumbnail */}
                                <div className="w-full aspect-[16/10] bg-gray-50 relative overflow-hidden">
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-secondary text-lg">{item.name}</h3>
                                        <GradeBadge grade={item.grade} />
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {item.keywords.slice(0, 3).map((kw) => (
                                            <span key={kw} className="text-xs text-text-sub bg-gray-50 px-2 py-0.5 rounded">
                                                #{kw}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-text-sub font-montserrat">{item.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <p className="text-center text-text-sub py-20">해당 조건의 프로젝트가 없습니다.</p>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
