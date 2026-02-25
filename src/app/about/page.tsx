"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { ArrowRight, Users, Target, TrendingUp, Award, Building2, Briefcase, GitBranch, Map, PlusCircle, CheckCircle2, ChevronRight, Share2, Search, CalendarCheck } from "lucide-react";

const COMPANY_INFO = {
    name: "주식회사 담하",
    established: "2021. 07. 19",
    address: "부산광역시 동래구 연안로 41, 5층 서정빌딩",
    phone: "051-757-0719",
    ceo: "정승우",
    employees: "정규직 48명 / 비정규직 12명",
    clients: "병원 131개 (종합병원 4, 일반병원 20, 한방 5, 요양 3, 치과 4, 의원 95+)"
};

const ORGANIZATION = [
    { dept: "경영기획실", desc: "전사 리스크 관리 및 중장기 비전 수립" },
    { dept: "광고관리부", desc: "검색광고, 매체광고 및 퍼포먼스 마케팅 최적화" },
    { dept: "웹제작부", desc: "특허기반 1Page 모달 홈페이지 구축 및 UI/UX 설계" },
    { dept: "마케팅기획부", desc: "채널별 통합 브랜딩 전략 및 바이럴 컨텐츠 기획" },
    { dept: "연구전담부서", desc: "의료 마케팅 솔루션 R&D 및 데이터 엔진 개발" },
    { dept: "컨텐츠기획부", desc: "사진, 영상, 인터랙티브 썸네일 등 비주얼 에셋 제작" }
];

const MOT_STAGES = [
    { title: "인지", icon: <Share2 className="w-6 h-6" />, desc: "검색, 배너, SNS 등을 통한 브랜드 첫인상 형성", channels: "구글 영상광고, 당근 배너, 버스/택배 오프라인" },
    { title: "탐색", icon: <Search className="w-6 h-6" />, desc: "블로그, 카페, 랜딩페이지에서 정보 및 신뢰 탐색", channels: "브랜드 블로그, 노출형 블로그, 네이버 카페" },
    { title: "예약 및 방문", icon: <CalendarCheck className="w-6 h-6" />, desc: "카카오채널, 전화 등 원활하고 체계적인 접점", channels: "인콜/아웃콜, 채팅문의, 사전예약 안내" },
    { title: "진료 및 상담", icon: <Users className="w-6 h-6" />, desc: "내원 후 환대, 전문적이고 투명한 상담/진료 경험", channels: "원내 시스템, 직원 응대 코칭, 상담팀 메뉴얼" },
    { title: "진료 후 관리", icon: <PlusCircle className="w-6 h-6" />, desc: "주의사항 안내, 회복 체크 등 긍정적 기억 강화", channels: "리콜/리마인드 문자, 회복 정보 제공 시스템" },
    { title: "리뷰 및 추천", icon: <CheckCircle2 className="w-6 h-6" />, desc: "충성고객화 및 지인 추천을 유도하는 사후 솔루션", channels: "긍정 후기 유도, 부정 이슈 데일리 피드백" }
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
    { icon: <TrendingUp className="w-10 h-10 text-[#D60000]" />, title: "데이터 기반 실행", description: "치밀한 데이터 분석을 바탕으로, 근거 있는 전략과 측정 가능한 결과를 증명합니다." },
    { icon: <Users className="w-10 h-10 text-[#D60000]" />, title: "현장 중심 사고", description: "병원 현장에서 경험을 쌓은 전문가들이 환자와 의료진 모두를 이해하는 언어를 씁니다." },
    { icon: <Award className="w-10 h-10 text-[#D60000]" />, title: "파트너십 신뢰", description: "95% 이상의 압도적인 수치가 말해주는, 한번 맺은 인연을 소중히 여기는 파트너십." }
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

            {/* Scale-up Organization Structure Layout */}
            <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <span className="inline-block px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Structure</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-4">
                            체계적인 <span className="text-[#D60000]">조직 구성</span>
                        </h2>
                        <p className="text-lg text-gray-500">각 분야 전문가들이 유기적으로 결합하여 가장 효율적인 솔루션을 제시합니다.</p>
                    </div>

                    <div className="relative pt-10 pb-20 lg:py-20">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[25px] left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-[#D60000] to-gray-300" />

                        {/* CEO Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            className="relative z-10 mx-auto w-full max-w-md bg-[#1F1F1F] rounded-2xl shadow-[0_20px_40px_-15px_rgba(5,11,24,0.3)] border border-white/10 p-6 text-center mb-12 lg:mb-20"
                        >
                            <h3 className="text-2xl font-black text-white">대표이사</h3>
                            <p className="text-[#D60000] mt-2 font-medium">총괄 및 경영 방침 수립</p>
                        </motion.div>

                        {/* Middle Connecting Lines (Desktop) */}
                        <div className="hidden lg:block absolute top-[165px] left-[15%] right-[15%] h-[2px] bg-gray-300" />
                        <div className="hidden lg:block absolute top-[165px] left-[15%] w-[2px] h-[40px] bg-gray-300" />
                        <div className="hidden lg:block absolute top-[165px] left-[30%] w-[2px] h-[40px] bg-gray-300" />
                        <div className="hidden lg:block absolute top-[165px] left-[45%] w-[2px] h-[40px] bg-gray-300" />
                        <div className="hidden lg:block absolute top-[165px] left-[60%] w-[2px] h-[40px] bg-gray-300" />
                        <div className="hidden lg:block absolute top-[165px] left-[75%] w-[2px] h-[40px] bg-gray-300" />
                        <div className="hidden lg:block absolute top-[165px] right-[15%] w-[2px] h-[40px] bg-gray-300" />

                        {/* Departments grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative z-10">
                            {ORGANIZATION.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-xl shadow-lg shadow-gray-200/50 p-6 text-center border-t-4 border-[#1F1F1F] hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <h4 className="text-lg font-bold text-[#1F1F1F] mb-3">{item.dept}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed break-keep">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
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
                            <p className="text-[#D60000] font-medium mb-8">정승우 대표</p>
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

            {/* MOT Based Branding - Customer Journey Mpa */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOT_STAGES.map((stage, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative bg-gray-50 rounded-2xl p-8 hover:bg-[#1F1F1F] hover:text-white transition-colors duration-500 group border border-gray-100"
                            >
                                <div className="absolute top-6 right-6 text-5xl font-black text-gray-200 group-hover:text-white/10 transition-colors pointer-events-none">
                                    0{idx + 1}
                                </div>
                                <div className="w-14 h-14 bg-white shadow-md rounded-xl flex items-center justify-center mb-6 text-[#D60000] group-hover:bg-[#D60000] group-hover:text-white transition-colors">
                                    {stage.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{stage.title}</h3>
                                <p className="text-gray-500 group-hover:text-gray-300 mb-6 font-light leading-relaxed">
                                    {stage.desc}
                                </p>
                                <div className="pt-4 border-t border-gray-200 group-hover:border-gray-700">
                                    <span className="block text-xs font-bold text-[#D60000] uppercase tracking-wider mb-2">Key Channels</span>
                                    <p className="text-sm font-medium">{stage.channels}</p>
                                </div>
                            </motion.div>
                        ))}
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
                                    href="https://accounts.kakao.com/login/?continue=http%3A%2F%2Fpf.kakao.com%2F_Jxldks%2Fchat#login"
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
        </main>
    );
}
