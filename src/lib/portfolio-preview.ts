export interface PortfolioCategory {
    id: string;
    title: string;
    category: "Branding" | "Marketing" | "Consulting" | "Offline";
    subtitle: string;
    image: string;
    stats: string;
    highlight: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
    {
        id: "cat-branding",
        title: "VI/CI 아이덴티티 구축부터\n특허 기반 홈페이지까지",
        category: "Branding",
        subtitle: "종합병원 4곳 포함 50+ 브랜딩 프로젝트",
        image: "/assets/images/0426453d81.jpg",
        stats: "50+ 프로젝트",
        highlight: "브랜드 인지도 평균 2.5배 향상"
    },
    {
        id: "cat-marketing",
        title: "검색 최적화부터\n퍼포먼스 광고까지",
        category: "Marketing",
        subtitle: "131개 의료기관 통합 마케팅 운영",
        image: "/assets/images/0b1667a809.jpg",
        stats: "131+ 의료기관",
        highlight: "평균 신환율 40% 증가"
    },
    {
        id: "cat-consulting",
        title: "개원 컨설팅부터\n경영 효율화까지",
        category: "Consulting",
        subtitle: "병원 경영 컨설팅 및 시스템 최적화",
        image: "/assets/images/0ec143283b.jpg",
        stats: "재의뢰율 95%+",
        highlight: "고객 재의뢰율 95% 이상"
    },
    {
        id: "cat-offline",
        title: "버스 광고부터\n지역 거점 마케팅까지",
        category: "Offline",
        subtitle: "부산 지역 밀착형 오프라인 광고 집행",
        image: "/assets/images/2b4e00e7a2.jpg",
        stats: "지역 밀착형",
        highlight: "지역 환자 인지도 대폭 향상"
    }
];
