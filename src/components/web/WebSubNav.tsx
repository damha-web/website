"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
    { id: "problem", label: "Problem" },
    { id: "about", label: "About" },
    { id: "difference", label: "Difference" },
    { id: "service", label: "Service" },
    { id: "cms", label: "CMS" },
    { id: "portfolio", label: "Portfolio" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
];

export default function WebSubNav() {
    const [activeSection, setActiveSection] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const sectionIds = NAV_ITEMS.map((item) => item.id);
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
            );

            observer.observe(el);
            observers.push(observer);
        });

        const heroEl = document.getElementById("hero");
        if (heroEl) {
            const heroObserver = new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(!entry.isIntersecting);
                },
                { threshold: 0.5 },
            );
            heroObserver.observe(heroEl);
            observers.push(heroObserver);
        }

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 z-50 bg-[#1F1F1F]/90 backdrop-blur-md border-b border-white/10"
                >
                    <div className="container mx-auto px-6 max-w-[1280px]">
                        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`relative px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors rounded-full ${
                                        activeSection === item.id
                                            ? "text-white"
                                            : "text-white/40 hover:text-white/70"
                                    }`}
                                >
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="subnav-active"
                                            className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 font-montserrat">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
