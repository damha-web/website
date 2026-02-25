"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animation-variants";
import HeroTitle from "./HeroTitle";
import HeroSearch from "./HeroSearch";
import ServiceCards from "./ServiceCards";
import HeroBackground from "./HeroBackground";

export default function Hero() {
    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32 bg-[#1F1F1F]"
        >
            {/* Background Effects */}
            <HeroBackground />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1400px] px-6 mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                {/* Left Side - Title and Search */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="space-y-12 lg:pr-12"
                >
                    <HeroTitle />
                    <HeroSearch />
                </motion.div>

                {/* Right Side - Floating Cards Grid */}
                <ServiceCards />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Scroll</span>
            </motion.div>
        </section>
    );
}
