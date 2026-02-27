"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { fadeInUp } from "@/lib/animation-variants";

const SERVICE_CARDS = [
    {
        title: "브랜딩",
        description: "VI 아이덴티티\n홈페이지 제작\n사진·영상 제작",
        href: "/services#branding",
        keywords: ["로고", "비주얼", "영상", "촬영", "웹사이트", "브랜드"]
    },
    {
        title: "마케팅",
        description: "검색광고\n블로그·카페\nSNS·유튜브",
        href: "/services#marketing",
        keywords: ["플레이스", "인스타", "페이스북", "바이럴", "상위노출"]
    },
    {
        title: "컨설팅",
        description: "개원 컨설팅\n경영 전략\n내부 시스템",
        href: "/services#consulting",
        keywords: ["개원", "병원", "손해사정", "경영", "전략", "시스템"]
    },
    {
        title: "오프라인",
        description: "버스·택배 광고\n인쇄물 디자인\n배포 마케팅",
        href: "/services#offline",
        keywords: ["버스", "택배", "전단지", "옥외광고", "인쇄"]
    },
];

interface HeroSearchProps {
    onTagClick?: (tag: string) => void;
}

export default function HeroSearch({ onTagClick }: HeroSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        return SERVICE_CARDS.filter(card =>
            card.title.toLowerCase().includes(query) ||
            card.description.toLowerCase().includes(query) ||
            card.keywords.some(k => k.includes(query))
        );
    }, [searchQuery]);

    const handleTagClick = (tag: string) => {
        const searchTerm = tag.replace('#', '');
        setSearchQuery(searchTerm);
        setIsSearchFocused(true);
        onTagClick?.(searchTerm);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (filteredResults.length > 0) {
            window.location.href = filteredResults[0].href;
        }
    };

    return (
        <motion.div variants={fadeInUp} className="max-w-xl relative group">
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        className="w-full pl-5 pr-14 py-4 md:py-5 rounded-md bg-white/5 backdrop-blur-md text-white placeholder:text-white/0 border border-white/20 focus:outline-none focus:border-[#D60000] transition-all text-base md:text-lg"
                    />
                    <button
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D60000] transition-colors"
                    >
                        <Search className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </form>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {isSearchFocused && searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-[#1F1F1F]/95 backdrop-blur-2xl rounded-lg shadow-2xl border border-white/10 overflow-hidden"
                    >
                        {filteredResults.length > 0 ? (
                            <div className="p-2">
                                {filteredResults.map((card) => (
                                    <Link
                                        key={card.title}
                                        href={card.href}
                                        className="flex items-center gap-4 p-3 rounded-md hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#D60000] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold">{card.title[0]}</span>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className="font-bold text-white group-hover/item:text-[#D60000] transition-colors">
                                                {card.title}
                                            </h4>
                                            <p className="text-xs text-white/50 line-clamp-1">
                                                {card.description.replace(/\n/g, ' • ')}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-center text-white/40">
                                <p className="font-medium">검색 결과가 없습니다</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Tags */}
            <div className="flex flex-nowrap md:flex-wrap gap-2 mt-3 md:mt-5 pb-2 md:pb-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {["#브랜딩", "#마케팅", "#컨설팅", "#오프라인", "#웹사이트", "#손해사정"].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 md:px-4 py-1.5 md:py-2 border rounded-md md:rounded-full text-[13px] md:text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${searchQuery === tag.replace('#', '')
                            ? "bg-[#D60000] text-white border-[#D60000] shadow-lg shadow-[#D60000]/20 scale-105"
                            : "bg-white/5 text-white/80 border-white/20 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
