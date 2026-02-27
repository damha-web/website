"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";


const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === "/";
    const isSolid = isScrolled || isMobileMenuOpen || !isHomePage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        if (isMobileMenuOpen) {
            const timer = setTimeout(() => setIsMobileMenuOpen(false), 0);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isSolid
                    ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="container mx-auto px-3 h-20 flex items-center justify-between">
                    {/* Logo */}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/" className="flex items-center gap-2 z-[110]">
                        <img
                            src="/assets/images/logo_allWhite.svg"
                            alt="DAMHA"
                            className={`h-6 md:h-7 w-auto transition-all duration-500 ${isSolid ? "brightness-0 invert-0" : "brightness-0 invert"}`}
                        />
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10 font-heading">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-extrabold transition-all hover:text-[#E47B41] tracking-wider uppercase ${pathname === link.href
                                    ? "text-[#E47B41]"
                                    : (isSolid ? "text-[#1F1F1F]" : "text-white")
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`md:hidden z-[110] transition-colors ${isSolid ? "text-[#1F1F1F]" : "text-white"} hover:text-[#E47B41]`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-[#1F1F1F] pt-32 px-10 md:hidden font-heading text-white flex flex-col"
                    >
                        <nav className="flex flex-col gap-10">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-4xl font-black tracking-tighter transition-all hover:text-[#E47B41] ${pathname === link.href ? "text-[#E47B41]" : "text-white/40"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                        </nav>

                        <div className="mt-auto pb-16">
                            <p className="text-white/20 text-sm font-bold tracking-widest uppercase mb-4">Contacts</p>
                            <p className="text-white/60 text-lg">051-757-0719</p>
                            <p className="text-white/60 text-lg">brand@damha.co.kr</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
