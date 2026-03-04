"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInFromLeft, slideInFromRight } from "@/lib/animation-variants";

const CAPABILITIES = [
    { label: "기획", value: 90 },
    { label: "디자인", value: 95 },
    { label: "퍼블리싱", value: 92 },
    { label: "개발", value: 88 },
    { label: "의료법 고려", value: 85 },
    { label: "유지관리", value: 93 },
    { label: "마케팅", value: 90 },
    { label: "접근성/SEO", value: 87 },
];

function RadarChart() {
    const cx = 150;
    const cy = 150;
    const maxR = 110;
    const n = CAPABILITIES.length;

    const getPoint = (index: number, ratio: number) => {
        const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
        return {
            x: cx + maxR * ratio * Math.cos(angle),
            y: cy + maxR * ratio * Math.sin(angle),
        };
    };

    const gridLevels = [0.25, 0.5, 0.75, 1];

    const dataPoints = CAPABILITIES.map((cap, i) => getPoint(i, cap.value / 100));
    const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

    return (
        <svg viewBox="0 0 300 300" className="w-full max-w-[340px] mx-auto">
            {/* Grid */}
            {gridLevels.map((level) => (
                <polygon
                    key={level}
                    points={Array.from({ length: n }, (_, i) => {
                        const p = getPoint(i, level);
                        return `${p.x},${p.y}`;
                    }).join(" ")}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth={1}
                />
            ))}

            {/* Axes */}
            {CAPABILITIES.map((_, i) => {
                const p = getPoint(i, 1);
                return (
                    <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth={1} />
                );
            })}

            {/* Data area */}
            <motion.path
                d={dataPath}
                fill="rgba(214, 0, 0, 0.1)"
                stroke="#D60000"
                strokeWidth={2}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Data dots */}
            {dataPoints.map((p, i) => (
                <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill="#D60000"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                />
            ))}

            {/* Labels */}
            {CAPABILITIES.map((cap, i) => {
                const p = getPoint(i, 1.22);
                return (
                    <text
                        key={i}
                        x={p.x}
                        y={p.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[11px] font-semibold fill-gray-600"
                    >
                        {cap.label}
                    </text>
                );
            })}
        </svg>
    );
}

export default function WebAboutSection() {
    return (
        <section className="py-24 md:py-32 bg-surface-alt">
            <div className="container mx-auto px-6 max-w-[1280px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Text */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={slideInFromLeft}
                    >
                        <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                            About Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight mb-8 break-keep leading-snug">
                            우리는 홈페이지를<br />
                            만들기만 하지 않습니다
                        </h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-1 bg-primary rounded-full shrink-0" />
                                <div>
                                    <h3 className="font-bold text-secondary text-lg mb-1">원스톱 제작</h3>
                                    <p className="text-text-sub leading-relaxed break-keep">
                                        기획 → 디자인 → 퍼블리싱 → 개발까지 하나의 팀에서 일관된 품질로 완성합니다.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1 bg-primary rounded-full shrink-0" />
                                <div>
                                    <h3 className="font-bold text-secondary text-lg mb-1">병원 특수성 반영</h3>
                                    <p className="text-text-sub leading-relaxed break-keep">
                                        의료법 준수, 마케팅 관점 설계, SEO 최적화까지 병원에 특화된 전문 역량을 보유하고 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <motion.p
                            variants={fadeInUp}
                            className="mt-10 text-lg text-text-sub break-keep"
                        >
                            웹과 관련된 모든 것을 책임지는 <strong className="text-secondary">올인원 파트너</strong>입니다.
                        </motion.p>
                    </motion.div>

                    {/* Right - Radar Chart */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={slideInFromRight}
                    >
                        <RadarChart />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
