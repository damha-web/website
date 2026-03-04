"use client";

import { motion, Variants } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { WEB_PRODUCTS, COMMON_SERVICES } from "@/data/web-products";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ServicePricing() {
    return (
        <section id="service" className="py-24 md:py-32 bg-surface-alt">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                        Service
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight mb-4 break-keep">
                        병원 규모에 맞는 <span className="text-primary">최적의 상품</span>
                    </h2>
                    <p className="text-text-sub text-lg max-w-2xl mx-auto break-keep">
                        병원의 규모와 목표에 맞춰 3가지 상품 라인업을 제공합니다.
                    </p>
                </motion.div>

                {/* Product Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
                >
                    {WEB_PRODUCTS.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={cardVariants}
                            className={`relative bg-white rounded-3xl border p-8 md:p-10 flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                                product.isPopular
                                    ? "border-primary shadow-lg ring-2 ring-primary/10"
                                    : "border-gray-100 shadow-sm"
                            }`}
                        >
                            {product.isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                    Popular
                                </span>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-black font-montserrat text-secondary mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-3xl font-bold text-primary mb-3">{product.price}</p>
                                <p className="text-text-sub text-sm">{product.target}</p>
                            </div>

                            <p className="text-secondary font-semibold text-sm mb-4 bg-gray-50 px-4 py-2 rounded-xl">
                                {product.structure}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.keywords.map((kw) => (
                                    <span
                                        key={kw}
                                        className="text-xs px-3 py-1 rounded-full bg-primary/5 text-primary font-medium"
                                    >
                                        #{kw}
                                    </span>
                                ))}
                            </div>

                            <ul className="space-y-3 mb-8 flex-grow">
                                {product.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-text-sub">
                                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="#contact"
                                className={`mt-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 group ${
                                    product.isPopular
                                        ? "bg-primary text-white hover:bg-primary/90"
                                        : "bg-secondary text-white hover:bg-secondary/90"
                                }`}
                            >
                                견적 문의
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Common Services */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {COMMON_SERVICES.map((service) => (
                        <div
                            key={service.title}
                            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
                        >
                            <h3 className="text-xl font-bold text-secondary mb-6">{service.title}</h3>
                            <ul className="space-y-3">
                                {service.items.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-text-sub">
                                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                                        <span className="break-keep">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
