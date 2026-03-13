"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { Globe } from "@/components/ui/globe";
import {
    Layers, LineChart, Compass, ArrowRight, PenTool,
    Search, Newspaper, Rocket, Scale, Video,
    Lock, UserCheck, ShieldAlert, LayoutTemplate, CheckCircle2, GraduationCap, Bus, Printer, MapPin, Map, Camera, Gavel,
    BarChart3, MessageSquare, FileText, AlertTriangle, ShieldCheck, ChevronDown, Phone, Globe2, MessageCircle, Mail,
    HeartHandshake, Stethoscope, Puzzle, Handshake
} from "lucide-react";
import { COMPANY } from "@/data/company";

// The expanded services content
const SERVICES = [
    {
        id: "branding",
        icon: <Layers className="w-14 h-14" />,
        title: "Branding",
        subtitle: "MOT 기반 브랜드 아이덴티티 구축",
        description: "환자가 병원을 처음 인지하는 순간부터 방문, 진료, 그리고 사후 관리까지. 모든 고객 여정(MOT)을 세밀하게 분석하여 흔들리지 않는 병원만의 본질적 가치를 설계합니다.",
        details: [
            {
                title: "VI/CI 및 아이덴티티",
                description: "원장님의 철학을 시각화하는 비주얼 시스템 구축 및 특허 기반 브랜딩 솔루션 도입.",
                icon: <PenTool className="w-6 h-6" />
            },
            {
                title: "특허기반 1Page 모달 홈페이지",
                description: "복잡한 뎁스를 없애고 이탈률을 최소화하는 고전환율 랜딩페이지 최적화.",
                icon: <LayoutTemplate className="w-6 h-6" />
            },
            {
                title: "프리미엄 비주얼 에셋",
                description: "원내 전문 촬영, 메디컬 3D 그래픽, 시네마틱 홍보 영상 등 하이엔드 콘텐츠 제작.",
                icon: <Camera className="w-6 h-6" />
            }
        ],
        specialFeature: {
            title: "MOT (Moments of Truth) 설계 모델",
            desc: "환자의 결정적 순간 6단계를 정의하고, 각 접점별로 최적화된 시각적, 심리적 경험을 제공하여 이탈 없는 브랜드 로열티를 형성합니다.",
            tags: ["인지", "탐색", "예약 및 방문", "진료 및 상담", "진료 후 관리", "리뷰 및 추천"]
        },
        process: [
            "환자 여정 분석 (MOT Map)",
            "핵심 가치 도출 (Concept)",
            "아이덴티티 전개 (VI/CI)",
            "플랫폼 구축 및 최적화"
        ],
        caseStudy: {
            title: "대형 정형외과 종합 브랜딩",
            result: "브랜드 리뉴얼 후 홈페이지 체류시간 3.2배 증가, 신환율 180% 상승"
        }
    },
    {
        id: "marketing",
        icon: <LineChart className="w-14 h-14" />,
        title: "Marketing",
        subtitle: "채널별 통합 퍼포먼스 마케팅",
        description: "단순한 조회수 늘리기가 아닙니다. 병원의 의료적 전문성을 강조하는 수준 높은 컨텐츠로 실제 내원과 예약 결제를 유도하는 퍼포먼스 마케팅을 전개합니다.",
        details: [
            {
                title: "검색 기반 바이럴 마케팅",
                description: "브랜드 블로그, 지역 카페, 지식iN 등 네이버 생태계 최적화 및 메인 키워드 상위 노출.",
                icon: <Search className="w-6 h-6" />
            },
            {
                title: "영상 및 SNS 미디어 확산",
                description: "유튜브 숏폼, 당근마켓, 인스타그램 등 최신 트렌드를 반영한 타겟팅 미디어 운영.",
                icon: <Video className="w-6 h-6" />
            },
            {
                title: "언론 보도 및 퍼포먼스 광고",
                description: "의학적 신뢰도를 높이는 언론 송출 및 데이터 기반 GDN, 메타 스폰서드 광고.",
                icon: <Newspaper className="w-6 h-6" />
            }
        ],
        specialFeature: null,
        process: [
            "진료권 내 경쟁사 분석",
            "매체별 Media Mix 수립",
            "고퀄리티 컨텐츠 주기적 발행",
            "데이터 기반 A/B 테스트 및 성과 최적화"
        ],
        caseStudy: {
            title: "네트워크 치과 통합 마케팅",
            result: "핵심 진료 키워드 95% 1페이지 장악, 디지털 매체 경유 내원 비중 60% 달성"
        }
    },
    {
        id: "consulting",
        icon: <Compass className="w-14 h-14" />,
        title: "Consulting",
        subtitle: "병원 경영 및 시스템 컨설팅",
        description: "병원 실무 출신의 베테랑들(간호사, 상담실장, 원무과장)이 직접 진료 프로토콜과 내부 시스템을 진단하여 새는 비용을 막고 수익 구조를 정상화합니다.",
        details: [
            {
                title: "개원 토탈 인큐베이팅",
                description: "입지 선정부터 상권 분석, 초기 인테리어 컨셉 및 직원 세팅 로드맵 제공.",
                icon: <Rocket className="w-6 h-6" />
            },
            {
                title: "손해사정 및 보험 컨설팅",
                description: "복잡한 보험 분쟁, 실비 청구 이슈 등 원내에서 감당하기 힘든 행정적 대응.",
                icon: <Scale className="w-6 h-6" />
            },
            {
                title: "고객 관리(CS) 및 조직 문화",
                description: "맞춤형 직원 응대 매뉴얼 제작, 컴플레인 대처 프로토콜 교육 및 부정 리뷰 방어.",
                icon: <HeartHandshake className="w-6 h-6" />
            }
        ],
        specialFeature: null,
        process: [
            "내부 지표 및 현장 실사 진단",
            "부서별 문제점 도출",
            "맞춤형 교육 및 솔루션 투입",
            "사후 모니터링 및 정기 리포트"
        ],
        caseStudy: {
            title: "중소 요양병원 경영 효율화",
            result: "내부 업무 프로세스 단축 개선, 환자 만족도 지수(CSI) 98점 획득"
        }
    },
    {
        id: "offline",
        icon: <Map className="w-14 h-14" />,
        title: "Offline",
        subtitle: "지역 타겟팅 오프라인 광고 및 디자인",
        description: "온라인 유입만으로는 부족한 지역 기반 비즈니스를 위해, 버스, 원내 게시물, 택배 등 오프라인 생활 반경을 촘촘하게 타겟팅하는 마케팅을 전개합니다.",
        details: [
            {
                title: "버스 및 택배 광고",
                description: "유동 인구와 주요 동선을 고려한 최적의 버스 노선 및 배송망 타겟팅 광고.",
                icon: <Bus className="w-6 h-6" />
            },
            {
                title: "디자인 인쇄물 제작",
                description: "원내 포스터, 리플렛, 브로슈어 등 병원의 브랜드 가치를 담은 수준 높은 인쇄물 기획 및 제작.",
                icon: <Printer className="w-6 h-6" />
            },
            {
                title: "배포 및 거점 마케팅",
                description: "주요 타겟 접점 지역에 직접 스며드는 게릴라 배포 및 지역 제휴 거점 마케팅.",
                icon: <MapPin className="w-6 h-6" />
            }
        ],
        specialFeature: null,
        process: [
            "진료권 지역 동선 분석",
            "매체별 제안 및 디자인 기획",
            "오프라인 매체 집행 및 제작",
            "인지도 모니터링 및 추가 기획"
        ],
        caseStudy: {
            title: "D 지역 거점 병원 오프라인 홍보",
            result: "버스 및 택배 매체 집중 노출 후, 지역 거주 환자 신규 내원율 30% 증가"
        }
    },
    {
        id: "safety",
        icon: <Lock className="w-14 h-14" />,
        title: "Safety & Biz",
        subtitle: "의료기관 통합 안전 및 경영지원",
        description: "최근 강화되고 있는 의료기관 평가 인증과 중대재해처벌법 등 법적/제도적 리스크로부터 원장님과 병원을 안전하게 보호하는 전방위적 관리 솔루션입니다.",
        details: [
            {
                title: "종합 안전 관리 시스템",
                description: "근로자 안전 보건 관리, 시설물 재난위험 평가 및 소방/보안 점검 체계화.",
                icon: <ShieldAlert className="w-6 h-6" />
            },
            {
                title: "노무 및 법무 리스크 컨설팅",
                description: "직원 근로 계약, 노무 리스크 점검 및 진료 간 발생할 수 있는 의료 분쟁 초기 대응 가이드.",
                icon: <Gavel className="w-6 h-6" />
            },
            {
                title: "법정 교육 및 인증 평가지원",
                description: "의료기관 인증 평가를 대비한 모의 조사 실시 및 직원 필수 교육(성희롱, 개인정보 등) 대행.",
                icon: <GraduationCap className="w-6 h-6" />
            }
        ],
        specialFeature: {
            title: "원장님의 든든한 방패 역할을 합니다",
            desc: "단순 마케팅을 넘어 원장님께서 오직 '진료'에만 전념하실 수 있도록 원내외 골치 아픈 행정과 리스크 관리를 밀착 방어해드립니다.",
            tags: ["중대재해대비", "인증평가대비", "리스크방어"]
        },
        process: [
            "법적 기준 의무 사항 진단",
            "리스크 평가 및 개선안 제시",
            "현장 안전 교육 및 매뉴얼 배포",
            "비상 연락망 및 상시 법률 자문 연계"
        ],
        caseStudy: {
            title: "C 척추관절 전문병원 안전관리",
            result: "의료기관 인증평가 무결점 통과 및 연간 행정비용 25% 절감"
        }
    }
];

const WHY_DAMHA = [
    {
        number: "01",
        title: "실무자 출신의 리얼 솔루션",
        description: "단순히 광고 대행만 해온 사람들이 아닙니다. 대학병원, 간호사, 상담실장 출신들이 현장의 생생한 언어로 직원들과 소통하며 근본적인 문제를 해결합니다.",
        icon: Stethoscope
    },
    {
        number: "02",
        title: "본질 중심의 통합 전략",
        description: "유입수만 늘리는 단편적 접근이 아닙니다. 브랜딩(가치 정립)에서 마케팅(확산), 안전관리(리스크 헷지)까지 하나의 통일된 로드맵으로 관리합니다.",
        icon: Puzzle
    },
    {
        number: "03",
        title: "데이터와 현장의 결합",
        description: "감에 의존하지 않고 전환율과 체류시간 데이터를 분석함과 동시에, 데일리로 현장 분위기와 CS 이슈를 체크하여 입체적인 컨설팅을 진행합니다.",
        icon: LineChart
    },
    {
        number: "04",
        title: "선택 받는 장기 파트너십",
        description: "95% 이상의 재계약률, 131개 이상의 병원 레퍼런스가 증명합니다. 한번 맺은 인연은 병원이 성장할 때까지 밀착 지원합니다.",
        icon: Handshake
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white py-24 lg:py-36">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-[55%] z-20"
                        >
                            {/* English Subtitle for elegance */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex items-center gap-4 mb-4"
                            >
                                <span className="w-12 h-[1px] bg-[#D60000]/50" />
                                <span className="text-[#D60000] font-bold tracking-widest text-sm uppercase">
                                    We Architect Brands
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-8"
                            >
                                우리는 <span className="text-[#D60000]">브랜드</span>를<br />
                                기획합니다.
                            </motion.h1>

                            <div className="text-[1.05rem] lg:text-[1.1rem] text-[#666666] leading-[2.0] font-medium break-keep space-y-6 mb-14">
                                <p>
                                    우리들의 생각을 자신이 가진 가장 큰 능력으로 확신하며<br className="hidden md:block" />
                                    그 확신으로 브랜드를 만들어 갑니다.
                                </p>
                                <p>
                                    고객이 만들어 낸 상품을 가장 필요로 하는 사람에게<br className="hidden md:block" />
                                    가장 정확한 전달 방법을 설계합니다.
                                </p>
                                <p>
                                    그리고 그 설계를 가치로 담아 경영방향을 설정하고<br className="hidden md:block" />
                                    운영, 실행, 평가 등을 통해 가치를 알리는데 집중합니다.
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-4">
                                <span className="w-8 h-[2px] bg-[#D60000] rounded-full"></span>
                                <p className="text-[1.15rem] lg:text-[1.25rem] font-bold text-[#111111]">
                                    우리는 이것을 <span className="text-[#D60000]">브랜드 기획</span>이라 합니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Globe Feature */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full lg:w-[45%] flex justify-center lg:justify-end relative"
                        >
                            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                                {/* Subtle background glow instead of hard shape */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,123,65,0.03)_0%,transparent_70%)] pointer-events-none" />

                                <Globe
                                    className="w-full h-full opacity-95 hover:opacity-100 transition-opacity duration-700"
                                    autoRotateSpeed={0.0015}
                                />

                                {/* Refined floating particles */}
                                <div className="absolute top-[20%] right-[10%] w-2 h-2 rounded-full bg-[#D60000] animate-pulse opacity-80" />
                                <div className="absolute bottom-[25%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#D60000] animate-ping opacity-60" style={{ animationDuration: '3s' }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Services Timeline Layout */}
            <div className="bg-white relative">
                {/* Center Line for Desktop */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2" />

                {SERVICES.map((service, index) => (
                    <section
                        key={service.id}
                        id={service.id}
                        className="py-24 relative"
                    >
                        <div className="container mx-auto px-6">
                            <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 lg:gap-24 items-center`}>

                                {/* Timeline Dot */}
                                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-[#1F1F1F] rounded-full items-center justify-center z-10 text-[#1F1F1F] font-bold">
                                    0{index + 1}
                                </div>

                                {/* Text Overview Panel */}
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full lg:w-1/2"
                                >
                                    <div className={`lg:${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#1F1F1F] text-white shadow-xl shadow-gray-200 mb-8">
                                            {service.icon}
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-4 font-montserrat">
                                            {service.title}
                                        </h2>
                                        <p className="text-2xl font-bold text-[#D60000] mb-6">
                                            {service.subtitle}
                                        </p>
                                        <p className="text-xl text-gray-500 leading-relaxed font-light break-keep mb-10">
                                            {service.description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 mb-10">
                                            {service.process.map((step, idx) => (
                                                <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                                    <CheckCircle2 className="w-4 h-4 text-[#D60000]" />
                                                    <span className="text-sm font-medium text-gray-700">{step}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 rounded-2xl border-l-4 border-[#1F1F1F]">
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Result</p>
                                            <p className="text-lg font-bold text-[#1F1F1F]">{service.caseStudy.title}</p>
                                            <p className="text-[#D60000] font-medium mt-1">{service.caseStudy.result}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Visual Details Panel */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="w-full lg:w-1/2"
                                >
                                    <div className="bg-[#1F1F1F] p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                        {/* Visual Graphic Element */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D60000]/20 to-transparent rounded-full blur-3xl" />

                                        <div className="relative z-10 space-y-6">
                                            {service.details.map((detail, idx) => (
                                                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                                                    <div className="flex items-start gap-5">
                                                        <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white group-hover:bg-[#D60000] transition-colors">
                                                            {detail.icon}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white mb-2">
                                                                {detail.title}
                                                            </h3>
                                                            <p className="text-gray-400 font-light leading-relaxed">
                                                                {detail.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Special Feature (if exists) */}
                                            {service.specialFeature && (
                                                <div className="mt-8 pt-8 border-t border-white/10">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <Layers className="w-5 h-5 text-[#D60000]" />
                                                        <h4 className="text-lg font-bold text-[#D60000]">{service.specialFeature.title}</h4>
                                                    </div>
                                                    <p className="text-gray-300 font-light text-sm leading-relaxed mb-4">
                                                        {service.specialFeature.desc}
                                                    </p>
                                                    {service.specialFeature.tags && (
                                                        <div className="flex gap-2 flex-wrap">
                                                            {service.specialFeature.tags.map((tag, tIdx) => (
                                                                <span key={tIdx} className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Quality Management System */}
            <section className="py-28 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-[#D60000]/10 text-[#D60000] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                            Quality Assurance
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-6">
                            운영 <span className="text-[#D60000]">품질관리</span> 시스템
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            감이 아닌 데이터로, 추측이 아닌 검증된 프로세스로 운영합니다
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <BarChart3 className="w-6 h-6" />, title: "포스팅 지수 평가", desc: "유료 전문 프로그램을 통한 콘텐츠 품질 및 포스팅 지수 정량 평가" },
                            { icon: <Search className="w-6 h-6" />, title: "노출 품질 평가", desc: "내부 개발 프로그램을 활용한 키워드 노출 순위 및 품질 모니터링" },
                            { icon: <FileText className="w-6 h-6" />, title: "월간 정기 보고", desc: "매월 1회 정기 마케팅 보고서 전달 및 광고주 니즈 반영 전략 수립" },
                            { icon: <AlertTriangle className="w-6 h-6" />, title: "부정이슈 데일리 피드백", desc: "네이버 및 매체별 부정이슈 실시간 모니터링 및 당일 피드백 대응" },
                            { icon: <ShieldCheck className="w-6 h-6" />, title: "불만족 리뷰 대응", desc: "위임장 접수 → 법적 사실관계 분석 → 네이버 고객센터 접수까지 체계적 방어" },
                            { icon: <MessageSquare className="w-6 h-6" />, title: "실시간 소통 체계", desc: "카카오톡 단체채팅 기반 부서 팀장급 + 병원 담당자 직접 소통" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-[#D60000]/5 rounded-xl flex items-center justify-center text-[#D60000] mb-4 group-hover:bg-[#D60000] group-hover:text-white transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Patient Acquisition Flow */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-[#D60000]/10 text-[#D60000] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                            Patient Journey
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-6">
                            광고 <span className="text-[#D60000]">고객 여정</span> 플로우
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            온·오프라인 통합 채널에서 환자가 내원하기까지의 체계적 여정
                        </p>
                    </motion.div>

                    {/* Flow Steps */}
                    <div className="flex flex-col items-center gap-0">
                        {/* Step 1: Channels */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full bg-gray-50 rounded-2xl p-8 border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-[#D60000] rounded-xl flex items-center justify-center text-white font-black text-sm">01</div>
                                <h3 className="text-xl font-bold text-[#1F1F1F]">유입 채널</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {["브랜드블로그", "노출형블로그", "네이버카페", "네이버검색광고", "구글영상광고", "구글배너광고", "카카오디스플레이", "카카오비즈보드", "당근배너", "유튜브채널", "랜딩페이지", "카카오채널", "오프라인영업"].map((ch, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-200">
                                        {ch}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Arrow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="py-3 text-[#D60000]"
                        >
                            <ChevronDown className="w-8 h-8" />
                        </motion.div>

                        {/* Step 2: Touchpoints */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="w-full bg-gray-50 rounded-2xl p-8 border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-[#D60000] rounded-xl flex items-center justify-center text-white font-black text-sm">02</div>
                                <h3 className="text-xl font-bold text-[#1F1F1F]">접점</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { icon: <Phone className="w-5 h-5" />, label: "전화연결" },
                                    { icon: <Globe2 className="w-5 h-5" />, label: "홈페이지연결" },
                                    { icon: <MessageCircle className="w-5 h-5" />, label: "빠른상담신청" },
                                    { icon: <Mail className="w-5 h-5" />, label: "카카오채널 채팅" },
                                ].map((tp, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200">
                                        <span className="text-[#D60000]">{tp.icon}</span>
                                        <span className="text-sm font-semibold text-[#1F1F1F]">{tp.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Arrow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="py-3 text-[#D60000]"
                        >
                            <ChevronDown className="w-8 h-8" />
                        </motion.div>

                        {/* Step 3: Consultation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-full bg-[#1F1F1F] rounded-2xl p-8 text-white"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#D60000] rounded-xl flex items-center justify-center text-white font-black text-sm">03</div>
                                <h3 className="text-xl font-bold">인콜/아웃콜 상담 및 예약</h3>
                            </div>
                            <p className="text-white/60 leading-relaxed">전문 상담팀이 환자의 니즈를 정확히 파악하고, 최적의 진료 일정을 안내하여 예약을 확정합니다.</p>
                        </motion.div>

                        {/* Arrow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="py-3 text-[#D60000]"
                        >
                            <ChevronDown className="w-8 h-8" />
                        </motion.div>

                        {/* Step 4: Visit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="w-full bg-gradient-to-r from-[#D60000] to-[#FF4444] rounded-2xl p-8 text-white"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-black text-sm">04</div>
                                <h3 className="text-xl font-bold">문자 전송 → 내원</h3>
                            </div>
                            <p className="text-white/80 leading-relaxed">예약 확인 문자와 내원 안내를 자동 발송하여 이탈률을 최소화하고, 환자의 실제 내원까지 연결합니다.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Damha - Redesigned */}
            <section className="py-32 bg-[#1F1F1F] text-white relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D60000]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-white/20">The Damha Difference</span>
                            <h2 className="text-4xl md:text-6xl font-black mb-6">
                                수많은 마케팅 회사 중,<br />
                                <span className="text-[#D60000]">왜 담하일까요?</span>
                            </h2>
                            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                                화려한 포장보다 진정성 있는 실무 경험으로 증명합니다.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {WHY_DAMHA.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#D60000] to-[#D60000] rounded-2xl flex items-center justify-center">
                                                <span className="text-white font-black text-xl">{item.number}</span>
                                            </div>
                                            <Icon className="w-6 h-6 text-white/20" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/60 leading-relaxed font-light break-keep">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-[#1F1F1F] mb-8 leading-tight">
                            현장을 아는 전문가의 전략으로<br />
                            <span className="text-[#D60000]">새로운 변화</span>를 시작하세요
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                            <MagneticWrapper>
                                <Link
                                    href="/portfolio"
                                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#1F1F1F] text-white font-bold rounded-full hover:bg-black transition-colors text-lg"
                                >
                                    성공 사례 보기
                                    <ArrowRight size={20} />
                                </Link>
                            </MagneticWrapper>

                            <MagneticWrapper>
                                <a
                                    href={COMPANY.kakaoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-[#D60000] font-bold rounded-full border border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all text-lg"
                                >
                                    프로젝트 문의하기
                                    <ArrowRight size={20} />
                                </a>
                            </MagneticWrapper>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
