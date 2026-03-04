export interface WebProduct {
    id: string;
    name: string;
    price: string;
    target: string;
    structure: string;
    keywords: string[];
    features: string[];
    isPopular?: boolean;
}

export const WEB_PRODUCTS: WebProduct[] = [
    {
        id: "lite",
        name: "LITE",
        price: "~500만원",
        target: "1인 병원, 소형 의원",
        structure: "Single ver. (원페이지)",
        keywords: ["빠른구축", "경제적"],
        features: [
            "원페이지 반응형 디자인",
            "기본 정보 노출 최적화",
            "CMS 관리 시스템 제공",
            "6개월 무상 유지관리",
        ],
    },
    {
        id: "basic",
        name: "BASIC",
        price: "700만원~",
        target: "지역 병원",
        structure: "Multi ver. (2depth)",
        keywords: ["아이덴티티", "맞춤형"],
        features: [
            "멀티페이지 반응형 디자인",
            "병원 아이덴티티 브랜딩",
            "CMS 관리 시스템 제공",
            "6개월 무상 유지관리",
        ],
        isPopular: true,
    },
    {
        id: "standard",
        name: "STANDARD",
        price: "1,000만원~",
        target: "대형 병원",
        structure: "Multi ver. + 콘텐츠 기획",
        keywords: ["구조설계", "콘텐츠기획"],
        features: [
            "멀티페이지 반응형 디자인",
            "콘텐츠 전략 기획 포함",
            "CMS 관리 시스템 제공",
            "6개월 무상 유지관리",
            "맞춤 인터랙션 디자인",
        ],
    },
];

export interface CommonService {
    title: string;
    items: string[];
}

export const COMMON_SERVICES: CommonService[] = [
    {
        title: "패키지 구성",
        items: [
            "정식 오픈 전 임시 사이트 제공",
            "고객 니즈 맞춤 상품 선택",
            "병원 특수성과 전문성 반영 기획",
            "병원 아이덴티티 브랜딩 디자인",
        ],
    },
    {
        title: "유지관리 서비스",
        items: [
            "6개월 무상 유지관리 (호스팅/도메인/인증서)",
            "시스템 장애 빠른 대응",
            "CMS(담하 관리 시스템) 제공",
            "신속한 소통 환경",
        ],
    },
];
