"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export interface AccordionItemData {
    id: string | number;
    title: string;
    category?: string;
    client?: string;
    image: string;
    slug?: string;
}

interface AccordionItemProps {
    item: AccordionItemData;
    isActive: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
}

const AccordionItem = ({ item, isActive, onMouseEnter, onClick }: AccordionItemProps) => {
    return (
        <div
            className={`
        relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isActive ? 'w-[75vw] sm:w-[60vw] xl:w-[480px] shrink-0' : 'w-[12vw] sm:w-[80px] shrink-0'}
      `}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes={isActive ? "(max-width: 640px) 75vw, (max-width: 1280px) 60vw, 480px" : "80px"}
            />

            {/* Premium dark overlays for text readability & effect */}
            <div
                className={`absolute inset-0 bg-[#1F1F1F] transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-10' : 'opacity-80'}`}
            />
            <div
                className={`absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/60 to-transparent pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-90 top-[30%]' : 'opacity-100 top-0'}`}
            />

            {/* Caption Text */}
            <div
                className={`
          absolute
          transition-all duration-500 ease-in-out
          ${isActive
                        ? 'bottom-6 md:bottom-8 left-5 md:left-8 right-5 md:right-8 opacity-100 translate-y-0 translate-x-0'
                        : 'bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 opacity-100 flex flex-col justify-end'
                    }
        `}
            >
                {isActive ? (
                    <div className="text-left w-full">
                        <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] md:text-xs font-bold rounded-full mb-2 md:mb-3">
                            {item.category}
                        </span>
                        <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight break-keep">
                            {item.title}
                        </h3>
                        <p className="text-white/80 text-xs md:text-sm font-medium">{item.client}</p>
                    </div>
                ) : (
                    <div className="transform -rotate-90 origin-center whitespace-nowrap w-[200px] text-center">
                        <span className="text-white text-lg font-bold uppercase tracking-[0.2em]">{item.category || item.title}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

interface InteractiveImageAccordionProps {
    items: AccordionItemData[];
}

export function InteractiveImageAccordion({ items }: InteractiveImageAccordionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-play effect
    useEffect(() => {
        if (isHovered || items.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 4000); // 4초마다 다음 슬라이더로 자동 변경

        return () => clearInterval(interval);
    }, [isHovered, items.length]);

    // Scroll active item into view smoothly
    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const activeChild = container.children[activeIndex] as HTMLElement;
            if (activeChild) {
                // 부드럽게 화면 가로 스크롤 포커싱
                // (scrollIntoView를 사용하면 전체 화면 위아래 스크롤이 트리거될 수 있으므로, 해당 컨테이너의 가로 스크롤만 계산해서 이동)
                const scrollTarget = activeChild.offsetLeft - (container.offsetWidth / 2) + (activeChild.offsetWidth / 2);
                container.scrollTo({
                    left: scrollTarget,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeIndex]);

    const handleItemHover = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-row items-center justify-start xl:justify-end gap-3 md:gap-4 overflow-x-auto pb-8 w-full custom-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {items.map((item, index) => (
                <AccordionItem
                    key={item.id}
                    item={item}
                    isActive={index === activeIndex}
                    onMouseEnter={() => handleItemHover(index)}
                    onClick={() => handleItemHover(index)}
                />
            ))}
            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
        </div>
    );
}
