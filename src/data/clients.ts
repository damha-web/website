export interface ClientCategory {
    category: string;
    count: number;
    suffix?: string;
}

export const CLIENT_CATEGORIES: ClientCategory[] = [
    { category: "종합병원", count: 4 },
    { category: "일반병원", count: 20 },
    { category: "한방병원", count: 5 },
    { category: "요양병원", count: 3 },
    { category: "치과병원", count: 4 },
    { category: "의원·한의원·치과의원", count: 95, suffix: "+" },
];

export const FEATURED_CLIENTS = [
    "일신기독병원", "센텀종합병원", "해동병원",
    "라온치과병원", "램브란트치과병원", "세계로치과병원",
];

export const CERTIFICATIONS = [
    {
        title: "특허청 특허등록",
        number: "제10-2784568호",
        description: "브랜딩 프로세스 기반 홈페이지 제작 및 광고대행 플랫폼 서비스 제공 시스템",
    },
    {
        title: "ISO 9001:2015",
        number: "품질경영시스템",
        description: "ITS 인증 - 체계적인 품질관리 프로세스를 통한 서비스 품질 보증",
    },
    {
        title: "ISO 14001:2015",
        number: "환경경영시스템",
        description: "ITS 인증 - 환경 영향을 고려한 지속가능 경영 체계 구축",
    },
    {
        title: "연구개발전담부서",
        number: "과학기술정보통신부 인정",
        description: "한국산업기술진흥협회 - 의료 마케팅 기술 연구개발 역량 공인",
    },
];
