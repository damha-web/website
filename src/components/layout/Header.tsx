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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent ${isScrolled || isMobileMenuOpen
                    ? "bg-white/80 backdrop-blur-md shadow-sm border-gray-100"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 z-50">
                        <img
                            src={isScrolled || isMobileMenuOpen ? "/assets/images/logo.svg" : "/assets/images/logo_allWhite.svg"}
                            alt="DAMHA"
                            className="h-6 md:h-7 w-auto transition-all duration-300"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href
                                        ? "text-primary"
                                        : isScrolled || isMobileMenuOpen
                                            ? "text-text-main"
                                            : "text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button className="bg-primary hover:bg-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300">
                            상담문의
                        </button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 text-text-main hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-2xl font-bold transition-colors ${pathname === link.href ? "text-primary" : "text-secondary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-8">
                                <button className="w-full bg-primary text-white py-4 rounded-xl text-lg font-semibold">
                                    상담문의
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
