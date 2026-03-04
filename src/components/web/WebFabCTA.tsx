"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { COMPANY } from "@/data/company";

export default function WebFabCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setIsVisible(scrollPercent >= 0.3);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
                >
                    {/* Contact CTA */}
                    <MagneticWrapper strength={0.3}>
                        <button
                            onClick={() => {
                                const el = document.getElementById("contact");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            aria-label="문의하기"
                        >
                            <MessageCircle size={24} fill="currentColor" strokeWidth={1} />
                        </button>
                    </MagneticWrapper>

                    {/* Phone */}
                    <MagneticWrapper strength={0.3}>
                        <a
                            href={`tel:${COMPANY.phone}`}
                            className="w-14 h-14 bg-white/90 backdrop-blur-sm text-[#1F1F1F] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                            aria-label="전화 상담"
                        >
                            <Phone size={22} strokeWidth={2} />
                        </a>
                    </MagneticWrapper>

                    {/* TOP */}
                    <MagneticWrapper strength={0.3}>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="w-14 h-14 bg-white/80 backdrop-blur-sm text-[#1F1F1F] rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 font-bold text-[10px]"
                            aria-label="최상단으로 이동"
                        >
                            <ArrowUp size={20} strokeWidth={2} className="mb-0.5" />
                            <span>TOP</span>
                        </button>
                    </MagneticWrapper>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
