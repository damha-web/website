export interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    client: string;
    image: string;
    slug: string;
}

export const PORTFOLIO_PREVIEWS: PortfolioItem[] = [
    {
        id: "p1",
        title: "성형외과 프리미엄 브랜드 아이덴티티 구축",
        category: "Branding",
        client: "A 성형외과",
        image: "/assets/images/0426453d81.jpg",
        slug: "plastic-surgery-identity",
    },
    {
        id: "p2",
        title: "치과 전문 디지털 퍼포먼스 마케팅",
        category: "Marketing",
        client: "B 치과병원",
        image: "/assets/images/0b1667a809.jpg",
        slug: "dental-performance-marketing",
    },
    {
        id: "p3",
        title: "한방병원 통합 경영 및 리브랜딩",
        category: "Consulting",
        client: "C 한방병원",
        image: "/assets/images/0ec143283b.jpg",
        slug: "oriental-medical-management",
    },
    {
        id: "p4",
        title: "안과 전문 병원 신규 웹사이트 구축",
        category: "Website",
        client: "D 안과의원",
        image: "/assets/images/266a44e489.jpg",
        slug: "eye-clinic-website",
    },
    {
        id: "p5",
        title: "정형외과 오프라인 개원 컨설팅",
        category: "Consulting",
        client: "E 정형외과",
        image: "/assets/images/2b4e00e7a2.jpg",
        slug: "orthopedics-launching",
    },
    {
        id: "p6",
        title: "피부과 유튜브 채널 및 바이럴 캠페인",
        category: "Marketing",
        client: "F 피부과",
        image: "/assets/images/2e69e5d185.jpg",
        slug: "dermatology-viral-campaign",
    }
];
