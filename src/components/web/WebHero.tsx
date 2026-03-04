"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animation-variants";
import { ArrowRight, Monitor, Palette, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { WEB_PORTFOLIO } from "@/data/web-portfolio";
import type { WebPortfolioItem } from "@/data/web-portfolio";
import PortfolioModal from "./PortfolioModal";

const CAROUSEL_ITEMS = WEB_PORTFOLIO.slice(0, 8);
const CAROUSEL_IMAGES = CAROUSEL_ITEMS.map((p, i) => ({
    id: p.id,
    src: p.thumbnail,
    alt: p.name,
    rotation: [-15, -8, 5, 12, -12, 8, -5, 10][i] ?? 0,
}));

const FEATURES = [
    {
        icon: Palette,
        title: "브랜드 특화 디자인",
        description: "병원 전문 맞춤형 웹 디자인",
    },
    {
        icon: Zap,
        title: "빠른 제작 과정",
        description: "기획부터 런칭까지 체계적 프로세스",
    },
    {
        icon: Settings,
        title: "자체 CMS 관리",
        description: "직관적 관리 시스템으로 직접 운영",
    },
];

export default function WebHero() {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [rotationAngles, setRotationAngles] = useState<number[]>([]);
    const [selectedItem, setSelectedItem] = useState<WebPortfolioItem | null>(null);

    // 카드 각도 초기화
    useEffect(() => {
        setRotationAngles(
            CAROUSEL_IMAGES.map((_, i) => i * (360 / CAROUSEL_IMAGES.length))
        );
    }, []);

    // 자동 회전
    useEffect(() => {
        const interval = setInterval(() => {
            setRotationAngles((prev) =>
                prev.map((angle) => (angle + 0.4) % 360)
            );
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    const perspectiveX = (mousePosition.x - 0.5) * 20;
    const perspectiveY = (mousePosition.y - 0.5) * 20;

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-secondary"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Main Content — 2 column */}
            <div className="relative z-10 w-full max-w-[1280px] px-6 mx-auto py-24 md:py-32">
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
                    {/* Mobile: Carousel first */}
                    <div className="lg:hidden mb-10">
                        <CarouselArea
                            images={CAROUSEL_IMAGES}
                            rotationAngles={rotationAngles}
                            perspectiveX={perspectiveX}
                            perspectiveY={perspectiveY}
                            onMouseMove={handleMouseMove}
                            onCardClick={(id) => {
                                const item = CAROUSEL_ITEMS.find((p) => p.id === id);
                                if (item) setSelectedItem(item);
                            }}
                            compact
                        />
                    </div>

                    {/* Left — Text */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="lg:w-1/2 text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="mb-8">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium">
                                <Monitor size={16} />
                                웹제작부
                            </span>
                        </motion.div>

                        {/* Main copy */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.15] tracking-tight mb-8 break-keep"
                        >
                            당신의 병원 홈페이지,
                            <br />
                            <span className="text-primary">새로운 관점</span>
                            에서
                            <br className="md:hidden" /> 만들겠습니다.
                        </motion.h1>

                        {/* Sub copy */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl lg:max-w-none leading-relaxed break-keep"
                        >
                            기획부터 운영까지, 웹과 관련된 모든 것을 책임지는
                            <br className="hidden md:block" />
                            올인원 파트너
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
                        >
                            <Link
                                href="#contact"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg"
                            >
                                프로젝트 문의하기
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                            <Link
                                href="#portfolio"
                                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-lg"
                            >
                                포트폴리오 보기
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right — 3D Carousel (Desktop only) */}
                    <div className="hidden lg:block lg:w-1/2">
                        <CarouselArea
                            images={CAROUSEL_IMAGES}
                            rotationAngles={rotationAngles}
                            perspectiveX={perspectiveX}
                            perspectiveY={perspectiveY}
                            onMouseMove={handleMouseMove}
                            onCardClick={(id) => {
                                const item = CAROUSEL_ITEMS.find((p) => p.id === id);
                                if (item) setSelectedItem(item);
                            }}
                        />
                    </div>
                </div>

                {/* Features */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 lg:mt-24"
                >
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                variants={fadeInUp}
                                className={cn(
                                    "text-center p-6 rounded-xl",
                                    "bg-white/5 backdrop-blur-sm border border-white/10",
                                    "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                                    "group"
                                )}
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <Icon
                                        size={20}
                                        className="text-primary"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-white/50">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">
                        Scroll
                    </span>
                </motion.div>
            </motion.div>

            {/* Portfolio Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <PortfolioModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

/* ── 3D Carousel Sub-Component ── */

interface CarouselAreaProps {
    images: typeof CAROUSEL_IMAGES;
    rotationAngles: number[];
    perspectiveX: number;
    perspectiveY: number;
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onCardClick: (id: string) => void;
    compact?: boolean;
}

function CarouselArea({
    images,
    rotationAngles,
    perspectiveX,
    perspectiveY,
    onMouseMove,
    onCardClick,
    compact = false,
}: CarouselAreaProps) {
    const height = compact ? "h-72 sm:h-80" : "h-[420px] xl:h-[500px]";
    const radius = compact ? 120 : 180;
    const cardSize = compact
        ? "w-24 h-32 sm:w-28 sm:h-36"
        : "w-32 h-40 xl:w-40 xl:h-48";

    return (
        <div
            className={cn("relative w-full", height)}
            onMouseMove={onMouseMove}
            style={{ perspective: "1000px" }}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                {images.map((image, index) => {
                    const angle =
                        ((rotationAngles[index] ?? 0) * Math.PI) / 180;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <div
                            key={image.id}
                            className={cn(
                                "absolute transition-all duration-300",
                                cardSize
                            )}
                            style={{
                                transform: `
                                    translate(${x}px, ${y}px)
                                    rotateX(${perspectiveY}deg)
                                    rotateY(${perspectiveX}deg)
                                    rotateZ(${image.rotation}deg)
                                `,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div
                                className={cn(
                                    "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl",
                                    "transition-all duration-300 hover:shadow-[0_25px_60px_rgba(214,0,0,0.15)] hover:scale-110",
                                    "cursor-pointer group"
                                )}
                                onClick={() => onCardClick(image.id)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 1024px) 120px, 160px"
                                />
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
