"use client";

import { motion, Variants } from "framer-motion";
import { PROCESS_STEPS } from "@/data/process-steps";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const stepVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ProcessTimeline() {
    return (
        <section id="process" className="py-24 md:py-32 bg-surface-alt overflow-hidden">
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
                        Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight break-keep">
                        프로젝트 <span className="text-primary">진행 프로세스</span>
                    </h2>
                </motion.div>

                {/* Timeline - Desktop: horizontal, Mobile: vertical */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Desktop horizontal */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            {/* Connecting line */}
                            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />
                            <motion.div
                                className="absolute top-8 left-0 h-0.5 bg-primary origin-left"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                style={{ right: 0 }}
                            />

                            <div className="grid grid-cols-8 gap-4">
                                {PROCESS_STEPS.map((step) => (
                                    <motion.div
                                        key={step.step}
                                        variants={stepVariants}
                                        className="flex flex-col items-center text-center group"
                                    >
                                        {/* Step number */}
                                        <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 group-hover:border-primary flex items-center justify-center mb-4 transition-colors duration-300 relative z-10 shadow-sm">
                                            <span className="text-lg font-bold font-montserrat text-secondary group-hover:text-primary transition-colors">
                                                {String(step.step).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-secondary text-sm mb-1">{step.title}</h4>
                                        <p className="text-xs text-primary font-medium mb-2">{step.description}</p>
                                        <p className="text-xs text-text-sub leading-relaxed break-keep opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {step.detail}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile vertical */}
                    <div className="lg:hidden space-y-0">
                        {PROCESS_STEPS.map((step, index) => (
                            <motion.div
                                key={step.step}
                                variants={stepVariants}
                                className="flex gap-4"
                            >
                                {/* Left: line + dot */}
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center shrink-0 shadow-sm z-10">
                                        <span className="text-sm font-bold font-montserrat text-primary">
                                            {String(step.step).padStart(2, "0")}
                                        </span>
                                    </div>
                                    {index < PROCESS_STEPS.length - 1 && (
                                        <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                                    )}
                                </div>

                                {/* Right: content */}
                                <div className="pb-8">
                                    <h4 className="font-bold text-secondary mb-1">{step.title}</h4>
                                    <p className="text-sm text-primary font-medium mb-1">{step.description}</p>
                                    <p className="text-sm text-text-sub leading-relaxed break-keep">{step.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
