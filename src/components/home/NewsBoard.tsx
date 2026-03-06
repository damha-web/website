"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsItem } from "@/data/news";
import NewsCard from "./NewsCard";

const AUTO_SLIDE_INTERVAL = 5000;

function useCurrentTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul",
  });
}

function formatDate(date: Date): string {
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  const d = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const day = d.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";
  return `${months[d.getMonth()]} ${day}${suffix}, ${d.getFullYear()}`;
}

function ClockBar() {
  const time = useCurrentTime();

  return (
    <div className="flex items-center justify-between px-1 mb-4 sm:mb-6">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <span className="font-mono text-sm text-white/50 tabular-nums">
          {time ? formatTime(time) : "--:--:--"}
        </span>
        <span className="text-sm text-white/30">(Seoul)</span>
      </div>
      <span className="text-sm text-white/40 tracking-wide">
        {time ? formatDate(time) : "---"}
      </span>
    </div>
  );
}

export default function NewsBoard() {
  const [featured, setFeatured] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data: NewsItem[]) => setFeatured(data));
  }, []);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) setItemsPerPage(1);
      else if (width < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(featured.length / itemsPerPage);

  const goNext = useCallback(() => {
    setCurrentPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto sliding
  useEffect(() => {
    if (totalPages <= 1 || isHovered) return;

    timerRef.current = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalPages, isHovered, goNext]);

  // Reset timer on manual navigation
  const handleManualNav = useCallback(
    (direction: "prev" | "next") => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (direction === "next") goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );

  const visibleItems = featured.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  if (featured.length === 0) return null;

  return (
    <div
      className="relative z-10 w-full max-w-[1600px] px-4 sm:px-6 mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 sm:mb-8" />

      {/* Clock Bar */}
      <ClockBar />

      {/* Cards Slider */}
      <div ref={containerRef} className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:gap-10"
            style={{
              gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
            }}
          >
            {visibleItems.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleManualNav("prev")}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="이전"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleManualNav("next")}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="다음"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-[200px] ml-auto h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/40 rounded-full"
              initial={false}
              animate={{
                width: `${((currentPage + 1) / totalPages) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
