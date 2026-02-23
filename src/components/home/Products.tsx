"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
    {
        id: "branding",
        title: "Branding",
        icon: <Sparkles className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />,
        description: "병원의 고유한 아이덴티티를 확립하고 차별화된 핵심 가치를 환자의 마음에 깊이 각인시키는 프리미엄 디자인 설계",
        link: "/services#branding",
    },
    {
        id: "marketing",
        title: "Marketing",
        icon: <TrendingUp className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />,
        description: "통합적이고 체계적인 데이터 분석 기반 디지털 퍼포먼스 마케팅 전략으로 실질적인 신환 창출과 폭발적인 매출 증대",
        link: "/services#marketing",
    },
    {
        id: "consulting",
        title: "Consulting",
        icon: <Briefcase className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />,
        description: "10년 이상의 병원 특화 실무 노하우를 바탕으로 한 경영 진단, 목표 달성 전략 수립 및 핵심 내부 시스템 최적화",
        link: "/services#consulting",
    },
];

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

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function Products() {
    return (
        <section className="py-32 bg-surface-light relative">
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
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {SERVICES.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            className="group relative bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                        >
                            {/* Card Accent Color Hover background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-[2.5]" />

                            <div className="relative z-10">
                                {service.icon}
                                <h3 className="text-2xl font-bold font-montserrat text-secondary mb-4 tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-text-sub leading-relaxed mb-8 min-h-[80px]">
                                    {service.description}
                                </p>

                                <Link
                                    href={service.link}
                                    className="inline-flex items-center text-secondary font-semibold group-hover:text-primary transition-colors text-sm"
                                >
                                    자세히 보기
                                    <span className="ml-2 bg-gray-50 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
