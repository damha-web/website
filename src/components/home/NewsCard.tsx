"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type NewsItem, categoryColors } from "@/data/news";

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

export default function NewsCard({ item, index }: NewsCardProps) {
  const categoryColor = categoryColors[item.category];

  return (
    <motion.a
      href={item.link}
      target={item.link.startsWith("http") ? "_blank" : undefined}
      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex gap-3 sm:gap-5 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer min-w-0"
    >
      {/* Thumbnail */}
      <div className="relative w-[120px] min-w-[120px] sm:w-[180px] sm:min-w-[180px] aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-white/10">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 120px, 180px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between py-1 min-w-0 flex-1">
        {/* Category */}
        <span
          className="text-xs sm:text-sm font-bold tracking-wide"
          style={{ color: categoryColor }}
        >
          {item.category}
        </span>

        {/* Title */}
        <h3 className="text-white font-medium text-sm sm:text-base leading-snug sm:leading-relaxed line-clamp-2 mt-1.5 sm:mt-2">
          {item.title}
        </h3>

        {/* Source + Date */}
        <div className="flex items-center gap-2 sm:gap-3 mt-auto pt-2 sm:pt-3">
          <span className="text-white/40 text-xs sm:text-sm truncate">{item.source}</span>
          <span className="text-white/30 text-xs sm:text-sm whitespace-nowrap">
            {item.date}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
