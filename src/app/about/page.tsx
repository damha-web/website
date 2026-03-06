"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { ArrowRight, Users, Target, BarChart3, Handshake, ClipboardList, CheckCircle2, ChevronRight, Eye, Search, CalendarCheck, Award, ShieldCheck, FlaskConical, Building2, Hospital, Leaf, Heart, Smile, Stethoscope, BriefcaseMedical, ThumbsUp, Medal } from "lucide-react";
import { COMPANY } from "@/data/company";
import { getClientSummary, STATS } from "@/data/stats";
import { CERTIFICATIONS, CLIENT_CATEGORIES } from "@/data/clients";

const COMPANY_INFO = {
    name: COMPANY.name,
    established: COMPANY.established,
    address: COMPANY.address,
    phone: COMPANY.phone,
    ceo: COMPANY.ceo,
    employees: `정규직 ${COMPANY.employees.regular}명 / 비정규직 ${COMPANY.employees.contract}명`,
    clients: getClientSummary()
};



const ORG_STAFF = [
    { name: "경영기획실", desc: "전사 리스크 관리 및 중장기 비전 수립" },
    { name: "연구전담", desc: "의료 마케팅 R&D 및 데이터 솔루션 개발" }
];

const ORG_DEPARTMENTS = [
    {
        en: "Marketing",
        name: "마케팅부",
        color: "#D60000",
        teams: ["마케팅팀", "디자인팀"],
        services: [
            "Social media",
            "Digital campaigns",
            "Influencer marketing",
            "Performance marketing",
            "Analytics & SEO"
        ]
    },
    {
        en: "Web",
        name: "웹제작부",
        color: "#3B82F6",
        teams: [],
        services: [
            "Front-end development",
            "Web publishing",
            "Interactive development",
            "App development",
            "Web accessibility"
        ]
    },
    {
        en: "Media Content",
        name: "미디어컨텐츠기획팀",
        color: "#8B5CF6",
        teams: [],
        services: [
            "Video production",
            "Content strategy",
            "Visual design",
            "Social content",
            "Photography"
        ]
    },
    {
        en: "Planning & Admin",
        name: "기획관리팀",
        color: "#10B981",
        teams: [],
        services: [
            "Business planning",
            "HR & Admin",
            "Finance & Accounting",
            "Operations",
            "Risk management"
        ]
    }
];

const DEPT_CAPABILITIES = [
    {
        en: "Consulting",
        ko: "컨설팅",
        icon: "C",
        color: "from-amber-500 to-orange-500",
        items: ["UX strategy", "Brand experience", "Digital strategy", "Social media strategy", "CRM strategy", "Market research"]
    },
    {
        en: "Content",
        ko: "컨텐츠",
        icon: "C",
        color: "from-rose-500 to-pink-500",
        items: ["Graphic design", "Video production", "Photography", "인터랙티브 컨텐츠", "브랜드 비주얼", "YouTube", "SNS"]
    },
    {
        en: "UX / UI",
        ko: "UX/UI 디자인",
        icon: "U",
        color: "from-blue-500 to-cyan-500",
        items: ["UI/UX Strategy", "UX Planning", "UI Design", "Websites", "Apps", "e-Commerce products"]
    }
];

const MOT_STAGES = [
    { title: "인지", icon: <Eye className="w-6 h-6" />, desc: "검색, 배너, SNS 등을 통한 브랜드 첫인상 형성", channels: "구글 영상광고, 당근 배너, 버스/택배 오프라인" },
    { title: "탐색", icon: <Search className="w-6 h-6" />, desc: "블로그, 카페, 랜딩페이지에서 정보 및 신뢰 탐색", channels: "브랜드 블로그, 노출형 블로그, 네이버 카페" },
    { title: "예약 및 방문", icon: <CalendarCheck className="w-6 h-6" />, desc: "카카오채널, 전화 등 원활하고 체계적인 접점", channels: "인콜/아웃콜, 채팅문의, 사전예약 안내" },
    { title: "진료 및 상담", icon: <Stethoscope className="w-6 h-6" />, desc: "내원 후 환대, 전문적이고 투명한 상담/진료 경험", channels: "원내 시스템, 직원 응대 코칭, 상담팀 메뉴얼" },
    { title: "진료 후 관리", icon: <ClipboardList className="w-6 h-6" />, desc: "주의사항 안내, 회복 체크 등 긍정적 기억 강화", channels: "리콜/리마인드 문자, 회복 정보 제공 시스템" },
    { title: "리뷰 및 추천", icon: <ThumbsUp className="w-6 h-6" />, desc: "충성고객화 및 지인 추천을 유도하는 사후 솔루션", channels: "긍정 후기 유도, 부정 이슈 데일리 피드백" }
];

const CEO_PROFILE = [
    "10년 이상 종합병원 행정/기획/홍보 실무 부서장",
    "現 대한병원행정관리자협회 부산시회 사무차장",
    "前 한국병원홍보협회 부산울산경남지회 사무국장",
    "前 동원과학기술대학교 보건행정과 겸임교수",
    "신라대학교 일반대학원 법학박사과정 수료(행정법, 의료법)",
    "부산대학교 의과대학 의료경영최고관리자과정 수료(32기)"
];

const TEAM_STRENGTH = [
    "대학병원, 종합병원, 전문병원 10년 이상 재직 경험의 간호사 2인 근무",
    "치과경력 치위생사 2인 근무",
    "10년 이상 웹디자인 및 디자인 총괄 경력의 실무 부서장 다수",
    "외식 서비스 전문기업 책임자 경력의 현장 밀착형 실무진",
    "현직 의사, 간호사, 행정 실무자, 간호조무사로 구성된 자문단"
];

const VALUES = [
    { icon: <Target className="w-10 h-10 text-[#D60000]" />, title: "본질 지향 전략", description: "단기 성과에 집착하지 않고 병원의 고유한 브랜드 가치 발굴과 지속적 성장을 추구합니다." },
    { icon: <BarChart3 className="w-10 h-10 text-[#D60000]" />, title: "데이터 기반 실행", description: "치밀한 데이터 분석을 바탕으로, 근거 있는 전략과 측정 가능한 결과를 증명합니다." },
    { icon: <BriefcaseMedical className="w-10 h-10 text-[#D60000]" />, title: "현장 중심 사고", description: "병원 현장에서 경험을 쌓은 전문가들이 환자와 의료진 모두를 이해하는 언어를 씁니다." },
    { icon: <Handshake className="w-10 h-10 text-[#D60000]" />, title: "파트너십 신뢰", description: "95% 이상의 압도적인 수치가 말해주는, 한번 맺은 인연을 소중히 여기는 파트너십." }
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D60000]/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[0] left-[-10%] w-[400px] h-[400px] bg-[#D60000]/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <span className="inline-block text-[#D60000] font-bold tracking-widest text-sm font-montserrat uppercase mb-6 bg-[#D60000]/10 px-5 py-2 rounded-full">
                            About DAMHA
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1F1F1F] mb-8 leading-tight">
                            <TextReveal text="브랜드에 노을을 입히다" />
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed break-keep font-light">
                            단순한 광고를 넘어 병원의 본질적 가치를 바로 세웁니다.<br />
                            의료 현장의 깊은 통찰력으로 성공적인 브랜딩을 실현하는 기업, 담하.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Company Info */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#1F1F1F] rounded-[2.5rem] p-12 md:p-16 text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D60000]/20 to-transparent opacity-50 pointer-events-none" />
                        <div className="grid md:grid-cols-2 gap-12 md:gap-20 relative z-10">
                            <div>
                                <h3 className="text-3xl font-bold mb-8 text-[#D60000] border-b border-white/10 pb-4">Company Overview</h3>
                                <div className="space-y-6">
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-sm mb-1 uppercase tracking-wider">회사명</span>
                                        <span className="text-xl font-medium">{COMPANY_INFO.name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-sm mb-1 uppercase tracking-wider">설립일</span>
                                        <span className="text-xl font-medium">{COMPANY_INFO.established}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-sm mb-1 uppercase tracking-wider">주요 실적</span>
                                        <span className="text-xl font-medium leading-relaxed">{COMPANY_INFO.clients}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-8 text-[#D60000] border-b border-white/10 pb-4">Contact Info</h3>
                                <div className="space-y-6">
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-sm mb-1 uppercase tracking-wider">대표이사</span>
                                        <span className="text-xl font-medium">{COMPANY_INFO.ceo}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-sm mb-1 uppercase tracking-wider">연락처</span>
                                        <span className="text-xl font-medium">{COMPANY_INFO.phone}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-sm mb-1 uppercase tracking-wider">주소</span>
                                        <span className="text-xl font-medium leading-relaxed">{COMPANY_INFO.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Organisation Section - Full Redesign */}
            <section className="py-32 bg-[#0E0E0E] overflow-hidden relative">
                {/* Ambient glow effects */}
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(228,123,65,0.07) 0%, transparent 70%)' }} />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-6 text-[#D60000]" style={{ background: 'rgba(228,123,65,0.1)', border: '1px solid rgba(228,123,65,0.2)' }}>
                            Organisation
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            우리가 만드는<br />
                            <span style={{ background: 'linear-gradient(90deg, #D60000, #FF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                체계적인 조직과 전문성
                            </span>
                        </h2>
                        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                            각 분야별 최고 수준의 시니어급 전문가들이 유기적으로 결합하여<br />클라이언트를 위한 가장 효율적이고 창의적인 솔루션을 제시합니다.
                        </p>
                    </motion.div>

                    {/* Top-Level org tree */}
                    <div className="flex flex-col items-center mb-20">
                        {/* CEO */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative mb-0"
                        >
                            <div className="relative px-12 py-6 rounded-2xl font-black text-2xl text-white text-center" style={{ background: 'linear-gradient(135deg, #D60000 0%, #FF4444 100%)', boxShadow: '0 20px 60px rgba(228,123,65,0.4)' }}>
                                대표이사
                                <div className="text-sm font-normal text-white/80 mt-1">주식회사 담하</div>
                            </div>

                        </motion.div>

                        {/* Vertical stem */}
                        <div className="w-[1px] h-10" style={{ background: 'linear-gradient(to bottom, #D60000, rgba(255,255,255,0.15))' }}></div>

                        {/* Staff level */}
                        <div className="relative flex items-center gap-16 mb-0">
                            {/* Horizontal rail */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/15"></div>
                            {ORG_STAFF.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="relative px-6 py-3 rounded-xl text-center z-10"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                                >
                                    <div className="text-white font-bold text-sm">{s.name}</div>
                                    <div className="text-white/40 text-xs mt-0.5">{s.desc}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Vertical stem 2 */}
                        <div className="w-[1px] h-10" style={{ background: 'rgba(255,255,255,0.15)' }}></div>

                        {/* Department row header */}
                        <div className="w-full max-w-6xl relative px-4">
                            <div className="hidden md:block absolute inset-x-[12.5%] top-0 h-[1px] bg-white/15"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                                {ORG_DEPARTMENTS.map((dept, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * idx, duration: 0.4 }}
                                        className="group relative rounded-2xl p-6 cursor-default"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        whileHover={{ y: -8, boxShadow: `0 30px 60px ${dept.color}40`, transition: { duration: 0.15, ease: 'easeOut' } }}
                                    >
                                        {/* Dept Color accent */}
                                        <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: dept.color }}></div>
                                        <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-1">{dept.en}</div>
                                        <div className="text-white font-black text-xl mb-4">{dept.name}</div>

                                        {/* Services list */}
                                        <ul className="space-y-2 mb-5">
                                            {dept.services.map((s, si) => (
                                                <li key={si} className="flex items-center gap-2.5 text-white/50 text-sm group-hover:text-white/70 transition-colors">
                                                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: dept.color }}></span>
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Teams */}
                                        {dept.teams.length > 0 && (
                                            <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                                <div className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-2">Teams</div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {dept.teams.map((t, ti) => (
                                                        <span key={ti} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${dept.color}20`, color: dept.color, border: `1px solid ${dept.color}30` }}>
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Capabilities grid - full width */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8"
                    >
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-3 text-white/30 text-xs font-bold tracking-[0.3em] uppercase">
                                <div className="h-[1px] w-12 bg-white/20"></div>
                                Core Capabilities
                                <div className="h-[1px] w-12 bg-white/20"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {DEPT_CAPABILITIES.map((cap, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="relative rounded-2xl p-6 overflow-hidden group"
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Gradient blob in corner */}
                                    <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 bg-gradient-to-br ${cap.color} blur-2xl`}></div>
                                    <div className="relative z-10">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg mb-4 bg-gradient-to-br ${cap.color}`}>
                                            {cap.icon}
                                        </div>
                                        <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-1">{cap.en}</div>
                                        <div className="text-white font-bold text-lg mb-4">{cap.ko}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {cap.items.map((item, ii) => (
                                                <span key={ii} className="text-xs text-white/50 group-hover:text-white/70 transition-colors px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CEO Profile & Team */}

            <section className="py-24 bg-[#1F1F1F] text-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                        {/* CEO */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10"
                        >
                            <h2 className="text-3xl font-bold mb-2 text-white">대표이사 <span className="text-[#D60000]">약력</span></h2>
                            <p className="text-[#ffffff] font-medium mb-8">정승우 대표</p>
                            <ul className="space-y-4">
                                {CEO_PROFILE.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <ChevronRight className="flex-shrink-0 w-5 h-5 text-[#D60000] mt-0.5" />
                                        <span className="text-white/80 leading-relaxed font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Team */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            className="bg-gradient-to-br from-[#D60000]/20 to-transparent rounded-3xl p-10 border border-[#D60000]/30"
                        >
                            <h2 className="text-3xl font-bold mb-2 text-white">전문가 그룹 <span className="text-[#D60000]">강점</span></h2>
                            <p className="text-white/50 font-medium mb-8">현장을 아는 실무진 결합</p>
                            <ul className="space-y-5">
                                {TEAM_STRENGTH.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D60000] mt-2.5 flex-shrink-0" />
                                        <span className="text-white/90 leading-relaxed font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Certifications & Patents */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 bg-[#D60000]/10 text-[#D60000] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                            Certifications
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-4">
                            공인된 <span className="text-[#D60000]">전문성</span>과 신뢰
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            특허 기술과 국제 인증으로 검증된 담하의 역량
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CERTIFICATIONS.map((cert, idx) => {
                            const icons = [
                                <Award key="award" className="w-8 h-8 text-[#D60000]" />,
                                <ShieldCheck key="shield1" className="w-8 h-8 text-[#D60000]" />,
                                <Medal key="medal" className="w-8 h-8 text-[#D60000]" />,
                                <FlaskConical key="flask" className="w-8 h-8 text-[#D60000]" />
                            ];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-[#D60000]/5 rounded-xl flex items-center justify-center mb-5">
                                        {icons[idx]}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1F1F1F] mb-1">{cert.title}</h3>
                                    <p className="text-sm font-semibold text-[#D60000] mb-3">{cert.number}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed">{cert.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Client Portfolio by Category */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 bg-[#D60000]/10 text-[#D60000] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                            Client Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-4">
                            <span className="text-[#D60000]">{STATS.hospitalClients}+</span> 의료기관 파트너
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            종합병원부터 의원까지, 다양한 규모의 의료기관이 담하를 선택했습니다
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CLIENT_CATEGORIES.map((client, idx) => {
                            const icons = [
                                <Building2 key="b2" className="w-7 h-7" />,
                                <Hospital key="h" className="w-7 h-7" />,
                                <Leaf key="l" className="w-7 h-7" />,
                                <Heart key="ht" className="w-7 h-7" />,
                                <Smile key="s" className="w-7 h-7" />,
                                <Stethoscope key="st" className="w-7 h-7" />
                            ];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-[#D60000]/5 transition-colors duration-300 border border-gray-100"
                                >
                                    <div className="text-[#D60000]/60 flex justify-center mb-3">
                                        {icons[idx]}
                                    </div>
                                    <div className="text-3xl font-black text-[#1F1F1F] mb-1">
                                        {client.count}<span className="text-[#D60000] text-xl">{client.suffix || ""}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">{client.category}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* MOT Based Branding - Customer Journey Map */}
            <section className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden relative">
                {/* Background journey path decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#D60000" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="#D60000" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#D60000" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 0,200 Q 400,100 800,200 T 1600,200 Q 2000,300 2400,200"
                            stroke="url(#pathGradient)"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="10,10"
                        />
                    </svg>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-20">
                        <span className="inline-block px-3 py-1 bg-red-50 text-[#D60000] rounded-full text-xs font-bold tracking-widest uppercase mb-4">Core Strategy</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-6">
                            MOT 기반 <span className="text-[#D60000]">고객 여정 설계</span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto break-keep">
                            환자가 병원을 만나는 첫 느낌부터 다시 내원하여 지인에게 추천하기까지.<br />
                            모든 결정적 순간(Moments of Truth)에 타겟 맞춤형 경험을 설계합니다.
                        </p>
                    </div>

                    {/* Journey path with connecting lines */}
                    <div className="relative">
                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                            {MOT_STAGES.map((stage, idx) => {
                                // Desktop: 1,2,3 / 6,5,4 | Mobile: 1,2,3,4,5,6
                                let orderClass = '';
                                if (idx === 0) orderClass = 'order-1';
                                else if (idx === 1) orderClass = 'order-2';
                                else if (idx === 2) orderClass = 'order-3';
                                else if (idx === 3) orderClass = 'order-4 lg:order-6';
                                else if (idx === 4) orderClass = 'order-5';
                                else if (idx === 5) orderClass = 'order-6 lg:order-4';

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                        transition={{ delay: idx * 0.15, duration: 0.5 }}
                                        className={`relative bg-white rounded-2xl p-8 hover:bg-[#1F1F1F] hover:text-white transition-all duration-500 group border-2 border-gray-100 hover:border-[#D60000] hover:shadow-2xl hover:shadow-[#D60000]/20 ${orderClass}`}
                                        style={{
                                            transform: idx % 2 === 0 ? 'translateY(0)' : 'translateY(20px)'
                                        }}
                                    >
                                        {/* Journey connectors - Desktop only */}
                                        {/* Card 1, 2: Right arrow */}
                                        {(idx === 0 || idx === 1) && (
                                            <motion.div
                                                className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: false }}
                                                transition={{ delay: idx * 0.15 + 0.8, duration: 0.5 }}
                                            >
                                                <div className="flex items-center gap-1">
                                                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#D60000]/60 to-[#D60000]/20"></div>
                                                    <ChevronRight className="w-6 h-6 text-[#D60000]" strokeWidth={2.5} />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Card 3: Down arrow */}
                                        {idx === 2 && (
                                            <motion.div
                                                className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6"
                                                initial={{ opacity: 0, y: -10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: false }}
                                                transition={{ delay: 1, duration: 0.5 }}
                                            >
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#D60000]/60 to-[#D60000]/20"></div>
                                                    <ChevronRight className="w-6 h-6 text-[#D60000] rotate-90" strokeWidth={2.5} />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Card 4, 5: Left arrow */}
                                        {(idx === 3 || idx === 4) && (
                                            <motion.div
                                                className="hidden lg:block absolute top-1/2 -left-6 -translate-y-1/2"
                                                initial={{ opacity: 0, x: 10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: false }}
                                                transition={{ delay: idx * 0.15 + 0.8, duration: 0.5 }}
                                            >
                                                <div className="flex items-center gap-1">
                                                    <ChevronRight className="w-6 h-6 text-[#D60000] rotate-180" strokeWidth={2.5} />
                                                    <div className="w-8 h-0.5 bg-gradient-to-l from-[#D60000]/60 to-[#D60000]/20"></div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Progress indicator */}
                                        <motion.div
                                            className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#D60000] to-[#FF4444] flex items-center justify-center font-black text-white shadow-lg"
                                            initial={{ scale: 0, rotate: -180 }}
                                            whileInView={{ scale: 1, rotate: 0 }}
                                            viewport={{ once: false }}
                                            transition={{ delay: idx * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                                        >
                                            {idx + 1}
                                        </motion.div>

                                        {/* Stage number watermark */}
                                        <div className="absolute top-6 right-6 text-5xl font-black text-gray-100 group-hover:text-white/5 transition-colors pointer-events-none">
                                            0{idx + 1}
                                        </div>

                                        {/* Icon */}
                                        <div className="w-14 h-14 bg-gray-50 shadow-md rounded-xl flex items-center justify-center mb-6 text-[#D60000] group-hover:bg-[#D60000] group-hover:text-white transition-colors relative z-10">
                                            {stage.icon}
                                        </div>

                                        <h3 className="text-3xl font-bold mb-4 relative z-10">{stage.title}</h3>
                                        <p className="text-base text-gray-500 group-hover:text-gray-300 mb-6 font-light leading-relaxed relative z-10">
                                            {stage.desc}
                                        </p>

                                        <div className="pt-4 border-t border-gray-200 group-hover:border-gray-700 relative z-10">
                                            <span className="block text-sm font-bold text-[#D60000] uppercase tracking-wider mb-2">Key Channels</span>
                                            <p className="text-base font-medium text-gray-600 group-hover:text-gray-300">{stage.channels}</p>
                                        </div>

                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D60000]/0 to-[#D60000]/0 group-hover:from-[#D60000]/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Journey completion indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="mt-12 text-center"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#D60000]/10 to-[#FF4444]/10 rounded-full border border-[#D60000]/30">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 rounded-full border-2 border-[#D60000] border-t-transparent"
                                />
                                <span className="text-sm font-bold text-[#D60000]">지속적인 순환 여정 (Continuous Journey Loop)</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-6">
                            <span className="text-[#D60000]">핵심 가치</span>와 원칙
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            세상에 흔한 수많은 마케팅 회사들과 담하가 확연히 구별되는 이유.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {VALUES.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 text-center hover:scale-105 transition-transform duration-300"
                            >
                                <div className="flex justify-center mb-6">{value.icon}</div>
                                <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed font-light break-keep">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-tr from-[#1F1F1F] to-[#210810] text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                            담하와 함께<br />
                            경이로운 <span className="text-[#D60000]">성공 스토리</span>를 시작하세요
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                            <MagneticWrapper>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#D60000] text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg"
                                >
                                    서비스 알아보기
                                    <ArrowRight size={20} />
                                </Link>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <a
                                    href={COMPANY.kakaoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1F1F1F] font-bold rounded-full hover:bg-gray-100 transition-colors text-lg"
                                >
                                    프로젝트 문의하기
                                </a>
                            </MagneticWrapper>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main >
    );
}
