"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Megaphone, Building2, Users, LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";

interface ServiceCard {
    title: string;
    icon: LucideIcon;
    description: string;
    href: string;
    color: string;
}

const SERVICE_CARDS: ServiceCard[] = [
    {
        title: "브랜딩",
        icon: FileText,
        description: "VI 아이덴티티\n홈페이지 제작\n사진·영상 제작",
        href: "/services#branding",
        color: "from-[#E47B41] to-[#EB6C4B]",
    },
    {
        title: "마케팅",
        icon: Megaphone,
        description: "검색광고\n블로그·카페\nSNS·유튜브",
        href: "/services#marketing",
        color: "from-blue-500 to-blue-600",
    },
    {
        title: "컨설팅",
        icon: Building2,
        description: "개원 컨설팅\n경영 전략\n내부 시스템",
        href: "/services#consulting",
        color: "from-purple-500 to-purple-600",
    },
    {
        title: "오프라인",
        icon: Users,
        description: "버스·택배 광고\n인쇄물 디자인\n배포 마케팅",
        href: "/services#offline",
        color: "from-green-500 to-green-600",
    },
];

export default function ServiceCards() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4 md:gap-5"
        >
            {SERVICE_CARDS.map((card) => {
                const Icon = card.icon;
                const links = card.description.split('\n');
                return (
                    <motion.div
                        key={card.title}
                        variants={fadeInUp}
                        className="h-full"
                    >
                        <Link
                            href={card.href}
                            className="block group relative h-full"
                        >
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-7 h-full hover:bg-white/10 transition-all duration-300 hover:border-[#D60000]/50 flex flex-col justify-center md:justify-between min-h-[80px] md:min-h-[220px]">
                                <div className="flex justify-between items-center md:items-start h-full md:h-auto md:mb-6 gap-2">
                                    <h3 className="text-white font-semibold md:font-bold text-[15px] sm:text-lg md:text-2xl group-hover:text-[#D60000] transition-colors duration-300 leading-tight">
                                        {card.title}
                                    </h3>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                                        <Icon className="absolute w-4 h-4 md:w-5 md:h-5 text-white/90 md:text-white transition-transform duration-500 ease-out group-hover:-translate-y-10" />
                                        <Icon className="absolute w-4 h-4 md:w-5 md:h-5 text-[#D60000] transition-transform duration-500 ease-out translate-y-10 group-hover:translate-y-0" />
                                    </div>
                                </div>
                                <div className="space-y-3 mt-auto hidden md:block">
                                    {links.map((line, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-white/60 group-hover:text-white/90 transition-colors">
                                            <span className="text-sm md:text-base font-light">{line}</span>
                                            <span className="text-white/30 group-hover:text-white/50 transition-colors text-sm inline-block w-4 text-right font-light">·</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
