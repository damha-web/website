"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { customFadeInUp } from "@/lib/animation-variants";

/**
 * Fixed Parallax Section - "Why Damha Works"
 * ThinkCreative 스타일 Split Layout with Sticky Image
 */

const PHILOSOPHY_CONTENT = [
    {
        id: 1,
        subtitle: "경험의 차이",
        title: "실무자의 시선으로\n현장을 해석합니다",
        description: "마케팅 전문가 이전에 병원 실무자(간호사, 상담실장 등)였던 담하의 팀원들은 병원 내부의 프로세스와 환자의 심리를 누구보다 깊이 이해합니다.",
        stats: "전 구성원 현장 실무 경험 보유"
    },
    {
        id: 2,
        subtitle: "전략의 본질",
        title: "단순한 홍보가 아닌\n경영을 마케팅합니다",
        description: "데이터만 보는 마케팅은 반쪽짜리입니다. 우리는 원내 동선, 상담 화법, 사후 관리까지 아우르는 통합적 시각으로 병원의 지속 가능한 성장을 설계합니다.",
        stats: "마케팅-경영 통합 솔루션 제공"
    },
    {
        id: 3,
        subtitle: "신뢰의 증거",
        title: "성과로 입증하는\n담하의 파트너십",
        description: "현장을 아는 전문가의 전략은 결과가 다릅니다. 10년간 500여 개의 프로젝트가 증명한 담하만의 성공 공식은 오직 결과로 말합니다.",
        stats: "재의뢰율 95% 이상"
    }
];

export default function PhilosophySection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Image effects based on scroll
    const imageOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const imageScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-surface-light"
        >
            {/* Fixed Background Image 영역 */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: "url('/assets/images/damha_mesh_decor.png')",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3 // 투명도 설정 (필요시 조절 가능)
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                    {/* Left: Sticky Image Container (Narrower for better balance) */}
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-0 lg:h-screen flex items-center">
                        <motion.div
                            style={{
                                opacity: imageOpacity,
                                scale: imageScale,
                            }}
                            className="w-full relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src="/assets/images/code.jpg"
                                alt="Damha Philosophy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/60 via-transparent to-primary/20" />

                            {/* Floating Quote */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                            >
                                <p className="text-sm text-text-sub mb-2 font-medium">담하의 신념</p>
                                <p className="text-lg font-bold text-secondary leading-snug">
                                    &quot;현장을 모르는 마케팅은&quot;<br />&quot;전술일 뿐 전략이 될 수 없다&quot;
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right: Scrolling Content (Wider for readability) */}
                    <div className="w-full lg:w-[65%] py-24 lg:py-60">
                        {/* Header Part */}
                        <div className="mb-60 lg:mb-[80vh]">
                            <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                                Why Damha Works
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-secondary mb-8 leading-[1.1] tracking-tight">
                                <TextReveal text="담하가 만드는" />
                                <br />
                                <span className="text-primary"><TextReveal text="결정적 차이" /></span>
                            </h2>
                            <p className="text-xl md:text-2xl text-text-sub leading-relaxed max-w-2xl break-keep">
                                우리는 단순한 마케팅 대행사가 아닙니다.<br />
                                현장의 언어를 마케팅으로 번역하는 브랜드 파트너입니다.
                            </p>
                        </div>

                        {/* Content Parts - significantly spaced out */}
                        <div className="space-y-[60vh] pb-[20vh]">
                            {PHILOSOPHY_CONTENT.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, margin: "-10% 0px -20% 0px" }}
                                    variants={customFadeInUp(0.8)}
                                    className="bg-white rounded-4xl p-10 lg:p-16 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative max-w-2xl"
                                >
                                    <span className="inline-block text-primary font-bold text-sm tracking-widest uppercase mb-6 font-montserrat">
                                        Step 0{item.id} — {item.subtitle}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-8 whitespace-pre-line leading-tight tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-xl text-text-sub leading-relaxed mb-10 break-keep">
                                        {item.description}
                                    </p>
                                    <div className="pt-8 border-t border-gray-100">
                                        <p className="text-lg font-bold text-primary font-montserrat flex items-center gap-3">
                                            <span className="w-10 h-px bg-primary"></span>
                                            {item.stats}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
