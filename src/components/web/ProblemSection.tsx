"use client";

import { motion, Variants } from "framer-motion";
import { MonitorX, Users, Settings } from "lucide-react";

const PROBLEMS = [
    {
        number: "01",
        title: "낮은 접근성과 낡은 UI",
        description: "업데이트 없이 정체된 홈페이지, 브랜드 가치 전달 실패",
        icon: MonitorX,
    },
    {
        number: "02",
        title: "환자 기대와 서비스 간 격차",
        description: "빠른 정보, 간편 예약, 신뢰감 미충족으로 포털 의존 심화",
        icon: Users,
    },
    {
        number: "03",
        title: "운영의 불편함",
        description: "기능이 있어도 관리가 어려우면 결국 방치되는 홈페이지",
        icon: Settings,
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ProblemSection() {
    return (
        <section className="py-24 md:py-32 bg-surface-light">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                        Problem
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight break-keep">
                        병원 홈페이지가 <span className="text-primary">외면받는</span> 3가지 이유
                    </h2>
                </motion.div>

                {/* Problem Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                >
                    {PROBLEMS.map((problem) => {
                        const Icon = problem.icon;
                        return (
                            <motion.div
                                key={problem.number}
                                variants={cardVariants}
                                className="group relative bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                            >
                                {/* Hover accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <span className="text-6xl font-black font-montserrat text-gray-100 group-hover:text-primary/10 transition-colors duration-500 block mb-6">
                                    {problem.number}
                                </span>

                                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                    <Icon size={24} className="text-primary" />
                                </div>

                                <h3 className="text-xl font-bold text-secondary mb-3 break-keep">
                                    {problem.title}
                                </h3>
                                <p className="text-text-sub leading-relaxed break-keep">
                                    {problem.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Closing copy */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-lg md:text-xl text-text-sub max-w-2xl mx-auto break-keep"
                >
                    환자와 병원을 잇는 <strong className="text-secondary">새로운 기준의 홈페이지</strong>가 필요합니다
                </motion.p>
            </div>
        </section>
    );
}
