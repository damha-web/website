"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HOME_SERVICES } from "@/data/services";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        clipPath: "inset(0% 0% 100% 0%)"
    },
    show: {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function Products() {
    return (
        <section className="py-32 relative overflow-hidden bg-surface-light">


            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-3 block">
                            Core Services
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 tracking-tight">
                            차원을 넘어서는<br className="md:hidden" /> 토탈 병원 마케팅
                        </h2>
                        <p className="text-lg text-text-sub max-w-2xl mx-auto leading-relaxed">
                            담하만의 검증된 3단계 프로세스는 단기적인 처방이 아닌<br className="hidden md:block" />
                            병원의 영속적인 브랜드 가치를 구축하고 지속적인 성장을 견인합니다.
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                >
                    {HOME_SERVICES.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            className="group relative bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full"
                        >
                            {/* Card Accent Color Hover background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-[2.5] z-20 pointer-events-none" />

                            <div className="relative z-10 w-full h-56 sm:h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="relative z-10 p-10 flex-grow flex flex-col bg-white">
                                <h3 className="text-3xl font-bold font-montserrat text-secondary mb-5 tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-text-sub text-lg leading-relaxed mb-10 flex-grow">
                                    {service.description}
                                </p>

                                <div className="mt-auto">
                                    <Link
                                        href={service.link}
                                        className="inline-flex items-center text-secondary font-semibold group-hover:text-primary transition-colors text-base"
                                    >
                                        자세히 보기
                                        <span className="ml-3 bg-gray-50 p-2.5 rounded-full group-hover:bg-primary/10 transition-colors">
                                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
