"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animation-variants";
import { ArrowRight, Monitor, Palette, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ImageTrail } from "@/components/ui/image-trail";
import { WEB_PORTFOLIO } from "@/data/web-portfolio";

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
    const heroRef = useRef<HTMLDivElement>(null);
    const [trailImages, setTrailImages] = useState<string[]>([]);

    useEffect(() => {
        // Hydration mismatch 방지를 위해 클라이언트 마운트 후 포트폴리오 이미지를 무작위로 섞습니다.
        const images = WEB_PORTFOLIO.map((p) => p.thumbnail);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTrailImages(images.sort(() => Math.random() - 0.5));
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-secondary"
        >
            {/* Image Trail Background Layer (z-0) */}
            <div className="absolute inset-0 z-0">
                <ImageTrail containerRef={heroRef}>
                    {trailImages.map((url, index) => (
                        <div
                            key={index}
                            className="flex relative w-28 h-28 md:w-36 md:h-36 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden bg-secondary border border-white/20"
                        >
                            <Image
                                src={url}
                                alt={`Portfolio image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 112px, 144px"
                                className="object-cover absolute inset-0 hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </ImageTrail>
            </div>

            {/* Animated background gradient overlays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Main Content (z-10) */}
            <div className="relative z-10 w-full max-w-[1280px] px-6 mx-auto py-24 md:py-32 pointer-events-none">
                <div className="flex flex-col items-center justify-center w-full">
                    {/* Center Text Column */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center text-center w-full pointer-events-auto max-w-4xl"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="mb-6 md:mb-8">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium backdrop-blur-md shadow-sm">
                                <Monitor size={16} />
                                웹제작부 포트폴리오
                            </span>
                        </motion.div>

                        {/* Main Typography */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black text-white leading-[1] tracking-tighter mb-4 relative select-none drop-shadow-2xl"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                                WEB INNOVATION
                            </span>
                        </motion.h1>

                        <motion.h2
                            variants={fadeInUp}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.3] tracking-tight mb-8 break-keep drop-shadow-lg"
                        >
                            당신의 병원 홈페이지,
                            <br className="md:hidden" />
                            <span className="text-primary mx-2">새로운 관점</span>
                            에서 만들겠습니다.
                        </motion.h2>

                        {/* Sub copy */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-base sm:text-lg md:text-xl text-white/70 mb-12 max-w-2xl leading-relaxed break-keep font-medium"
                        >
                            기획부터 운영까지, 웹과 관련된 모든 것을 책임지는
                            <br className="hidden md:block" />
                            올인원 파트너 경험을 선사합니다.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="#contact"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(214,0,0,0.4)] hover:scale-105 transition-all duration-300 text-lg"
                            >
                                프로젝트 문의하기
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                            <Link
                                href="#portfolio"
                                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-lg bg-black/20 backdrop-blur-sm"
                            >
                                포트폴리오 보기
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Features */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-20 lg:mt-32 max-w-5xl mx-auto pointer-events-auto px-4"
                >
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                variants={fadeInUp}
                                className={cn(
                                    "text-center p-6 sm:p-8 rounded-3xl",
                                    "bg-white/5 backdrop-blur-xl border border-white/10",
                                    "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                                    "group",
                                    "shadow-2xl hover:-translate-y-1"
                                )}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                                    <Icon
                                        size={28}
                                        className="text-primary"
                                    />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-3"
                >
                    <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30">
                        Scroll
                    </span>
                </motion.div>
            </motion.div>
        </section >
    );
}
