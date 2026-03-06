"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animation-variants";
import HeroTitle from "./HeroTitle";
import HeroSearch from "./HeroSearch";
import ServiceCards from "./ServiceCards";
import HeroBackground from "./HeroBackground";
import NewsBoard from "./NewsBoard";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-[#1F1F1F]">
            {/* Background Effects */}
            <HeroBackground />

            {/* Hero Main Content */}
            <div className="relative min-h-[70vh] flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="relative z-10 w-full max-w-[1600px] px-6 mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-30 items-center">

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
            </div>

            {/* News Board - integrated below hero */}
            <NewsBoard />
        </section>
    );
}
