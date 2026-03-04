/**
 * Hero 영역 서비스 카드 (ServiceCards.tsx, HeroSearch.tsx 공유)
 */
export interface HeroServiceCard {
    title: string;
    description: string;
    href: string;
    keywords: string[];
}

export const HERO_SERVICE_CARDS: HeroServiceCard[] = [
    { title: "브랜딩", description: "VI 아이덴티티\n홈페이지 제작\n사진·영상 제작", href: "/services#branding", keywords: ["로고", "비주얼", "영상", "촬영", "웹사이트", "브랜드"] },
    { title: "마케팅", description: "검색광고\n블로그·카페\nSNS·유튜브", href: "/services#marketing", keywords: ["플레이스", "인스타", "페이스북", "바이럴", "상위노출"] },
    { title: "컨설팅", description: "개원 컨설팅\n경영 전략\n내부 시스템", href: "/services#consulting", keywords: ["개원", "병원", "손해사정", "경영", "전략", "시스템"] },
    { title: "고객 관리(CS)", description: "직원 응대 매뉴얼 제작\n컴플레인 대처 교육\n부정 리뷰 방어", href: "/services#consulting", keywords: ["고객관리", "CS", "조직문화", "매뉴얼", "교육", "리뷰", "불만족"] },
    { title: "오프라인", description: "버스·택배 광고\n인쇄물 디자인\n배포 마케팅", href: "/services#offline", keywords: ["버스", "택배", "전단지", "옥외광고", "인쇄"] },
];

/**
 * 홈 Products 섹션 서비스 카드
 */
export interface ServiceSummary {
    id: string;
    title: string;
    image: string;
    description: string;
    link: string;
}

export const HOME_SERVICES: ServiceSummary[] = [
    {
        id: "branding",
        title: "Branding",
        image: "/images/services/v2/branding.png",
        description: "병원의 고유한 아이덴티티를 확립하고 차별화된 핵심 가치를 환자의 마음에 깊이 각인시키는 프리미엄 디자인 설계",
        link: "/services#branding",
    },
    {
        id: "marketing",
        title: "Marketing",
        image: "/images/services/v2/marketing.png",
        description: "통합적이고 체계적인 데이터 분석 기반 디지털 퍼포먼스 마케팅 전략으로 실질적인 신환 창출과 폭발적인 매출 증대",
        link: "/services#marketing",
    },
    {
        id: "consulting",
        title: "Consulting",
        image: "/images/services/v2/consulting.png",
        description: "10년 이상의 병원 특화 실무 노하우를 바탕으로 한 경영 진단, 목표 달성 전략 수립 및 핵심 내부 시스템 최적화",
        link: "/services#consulting",
    },
    {
        id: "offline",
        title: "Offline",
        image: "/assets/images/2b4e00e7a2.jpg",
        description: "버스, 택배, 인쇄물 등 지역 생활 반경을 촘촘하게 타겟팅하는 오프라인 마케팅으로 병원 인지도를 극대화",
        link: "/services#offline",
    },
];
