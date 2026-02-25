"use client";

import { useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_PREVIEWS } from "@/lib/portfolio-preview";

export default function CaseStudyPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const portfolioItem = useMemo(() => {
        return PORTFOLIO_PREVIEWS.find((item) => item.slug === slug);
    }, [slug]);

    // Find adjacent projects for navigation
    const currentIndex = useMemo(() => {
        return PORTFOLIO_PREVIEWS.findIndex((item) => item.slug === slug);
    }, [slug]);

    const prevProject = currentIndex > 0 ? PORTFOLIO_PREVIEWS[currentIndex - 1] : null;
    const nextProject = currentIndex < PORTFOLIO_PREVIEWS.length - 1 ? PORTFOLIO_PREVIEWS[currentIndex + 1] : null;

    if (!portfolioItem) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pb-32">
            {/* Page Header (White Theme) */}
            <section className="pt-32 pb-12 md:pb-16 container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold font-montserrat tracking-widest uppercase mb-6">
                        {portfolioItem.category}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight break-keep">
                        {portfolioItem.title}
                    </h1>
                    <p className="text-lg md:text-xl text-text-sub max-w-2xl leading-relaxed break-keep">
                        {portfolioItem.overview}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-12 md:mt-16 flex flex-wrap gap-12 border-t border-gray-200 pt-8"
                >
                    <div>
                        <p className="text-text-sub text-xs font-montserrat uppercase tracking-wider mb-2">Client</p>
                        <p className="text-secondary font-bold text-lg">{portfolioItem.client}</p>
                    </div>
                    <div>
                        <p className="text-text-sub text-xs font-montserrat uppercase tracking-wider mb-2">Services</p>
                        <p className="text-secondary font-bold text-lg">{portfolioItem.category}</p>
                    </div>
                </motion.div>
            </section>

            {/* Hero Image (No Dark Overlay) */}
            <section className="container mx-auto px-6 max-w-6xl mb-4 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full aspect-[4/3] md:aspect-[21/9] lg:h-[60vh] rounded-3xl overflow-hidden shadow-sm border border-gray-100"
                >
                    <Image
                        src={portfolioItem.image}
                        alt={portfolioItem.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </section>

            {/* Back to Portfolio Link */}
            <div className="container mx-auto px-6 max-w-5xl py-8">
                <Link href="/portfolio" className="inline-flex items-center text-text-sub hover:text-primary transition-colors font-medium text-sm group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to all cases
                </Link>
            </div>

            {/* Content Sections */}
            <section className="container mx-auto px-6 max-w-4xl pt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-16 gap-y-12 mb-24"
                >
                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-sm font-bold font-montserrat text-primary uppercase tracking-widest sticky top-32">
                            01. Background
                        </h2>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6 leading-tight break-keep">
                            당면한 핵심 과제와 목표
                        </h3>
                        <p className="text-base md:text-lg text-text-main leading-relaxed break-keep">
                            {portfolioItem.background}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-sm font-bold font-montserrat text-primary uppercase tracking-widest sticky top-32">
                            02. Strategy
                        </h2>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6 leading-tight break-keep">
                            담하만의 해결 전략
                        </h3>
                        <p className="text-base md:text-lg text-text-main leading-relaxed break-keep">
                            {portfolioItem.strategy}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-sm font-bold font-montserrat text-primary uppercase tracking-widest sticky top-32">
                            03. Results
                        </h2>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6 leading-tight break-keep">
                            눈부신 성과와 지표
                        </h3>
                        <ul className="space-y-4">
                            {portfolioItem.results.map((result, idx) => (
                                <li key={idx} className="flex items-start gap-4 bg-gray-50 p-5 md:p-6 rounded-2xl border border-gray-100">
                                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={24} />
                                    <span className="text-base md:text-lg font-medium text-text-main leading-relaxed">
                                        {result}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </section>

            {/* Image Gallery */}
            {portfolioItem.detailImages && portfolioItem.detailImages.length > 0 && (
                <section className="container mx-auto px-6 max-w-5xl mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {portfolioItem.detailImages.map((imgUrl, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`relative w-full overflow-hidden rounded-3xl shadow-sm border border-gray-100 ${idx === 0 ? "aspect-[4/3] md:col-span-2 md:aspect-[21/9]" : "aspect-[4/3]"}`}
                            >
                                <Image
                                    src={imgUrl}
                                    alt={`Case study detail ${idx}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Next/Prev Project Navigation */}
            <section className="container mx-auto px-6 max-w-6xl mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Previous Project */}
                    {prevProject && (
                        <Link
                            href={`/portfolio/${prevProject.slug}`}
                            className="group relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 hover:shadow-2xl transition-all duration-500"
                        >
                            <Image
                                src={prevProject.image}
                                alt={prevProject.title}
                                fill
                                className="object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                                <p className="text-xs font-bold font-montserrat uppercase tracking-wider mb-2 opacity-70">
                                    ← Previous Case
                                </p>
                                <h4 className="text-xl font-bold leading-tight break-keep">
                                    {prevProject.title}
                                </h4>
                            </div>
                        </Link>
                    )}

                    {/* Next Project */}
                    {nextProject && (
                        <Link
                            href={`/portfolio/${nextProject.slug}`}
                            className={`group relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 hover:shadow-2xl transition-all duration-500 ${!prevProject ? 'md:col-start-2' : ''}`}
                        >
                            <Image
                                src={nextProject.image}
                                alt={nextProject.title}
                                fill
                                className="object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                            <div className="absolute bottom-0 right-0 p-8 text-white z-10 text-right">
                                <p className="text-xs font-bold font-montserrat uppercase tracking-wider mb-2 opacity-70">
                                    Next Case →
                                </p>
                                <h4 className="text-xl font-bold leading-tight break-keep">
                                    {nextProject.title}
                                </h4>
                            </div>
                        </Link>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 max-w-4xl text-center border-t border-gray-200 pt-20">
                <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-8 break-keep leading-tight">
                    귀사의 비즈니스도 성공 스토리의 <br className="hidden md:block" />주인공이 될 수 있습니다.
                </h3>
                <Link href="/services" className="inline-flex items-center justify-center px-8 text-base md:text-lg py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    프로젝트 문의하기
                </Link>
            </section>
        </main>
    );
}
