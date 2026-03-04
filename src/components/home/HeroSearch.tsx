"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { fadeInUp } from "@/lib/animation-variants";
import { HERO_SERVICE_CARDS } from "@/data/services";

interface HeroSearchProps {
    onTagClick?: (tag: string) => void;
}

export default function HeroSearch({ onTagClick }: HeroSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        return HERO_SERVICE_CARDS.filter(card =>
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
                {["#브랜딩", "#마케팅", "#컨설팅", "#오프라인", "#웹사이트", "#고객관리"].map((tag) => (
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
