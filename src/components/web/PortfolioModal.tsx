"use client";

import { motion } from "framer-motion";
import type { WebGrade, WebPortfolioItem } from "@/data/web-portfolio";
import { ExternalLink, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export { GradeBadge };

export default function PortfolioModal({
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
                        <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            {item.url}
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {item.keywords.map((kw) => (
                            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-text-sub">
                                {kw}
                            </span>
                        ))}
                    </div>

                    {/* Full Page Details Mode */}
                    <div className="mb-10 space-y-8">
                        {/* PC Screenshot */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-secondary flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                PC 버전
                            </h4>
                            <div className="w-full bg-gray-50 border border-gray-100 rounded-xl overflow-hidden relative">
                                <Image
                                    src={`/assets/images/portfolio/detail/${item.id}-pc.jpg`}
                                    alt={`${item.name} PC 화면`}
                                    width={1440}
                                    height={900}
                                    className="w-full h-auto object-contain"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = item.thumbnail;
                                    }}
                                />
                            </div>
                        </div>

                        {/* Mobile Screenshot */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-secondary flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-secondary" />
                                모바일 버전
                            </h4>
                            <div className="w-full max-w-[320px] mx-auto bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden relative shadow-sm">
                                <Image
                                    src={`/assets/images/portfolio/detail/${item.id}-mobile.jpg`}
                                    alt={`${item.name} 모바일 화면`}
                                    width={390}
                                    height={844}
                                    className="w-full h-auto object-cover"
                                    sizes="320px"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center border-t border-gray-100 pt-8">
                        <Link
                            href="#contact"
                            onClick={onClose}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all group"
                        >
                            이런 사이트가 필요하신가요?
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
