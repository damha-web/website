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

export interface ClientLogo {
    id: number;
    name: string;
    imagePath: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
    { id: 1, name: "거인병원", imagePath: "/assets/images/client/ref-001.png" },
    { id: 2, name: "광안자모병원", imagePath: "/assets/images/client/ref-002.png" },
    { id: 3, name: "구포성심병원", imagePath: "/assets/images/client/ref-003.png" },
    { id: 4, name: "김병준레다스흉부외과의원", imagePath: "/assets/images/client/ref-004.png" },
    { id: 5, name: "김상호신경과", imagePath: "/assets/images/client/ref-005.png" },
    { id: 6, name: "당당한방병원창원점", imagePath: "/assets/images/client/ref-006.png" },
    { id: 7, name: "대구365MC", imagePath: "/assets/images/client/ref-007.png" },
    { id: 8, name: "대구우리들병원", imagePath: "/assets/images/client/ref-008.png" },
    { id: 9, name: "더탄탄병원", imagePath: "/assets/images/client/ref-009.png" },
    { id: 10, name: "드림나라병원", imagePath: "/assets/images/client/ref-010.png" },
    { id: 11, name: "램브란트치과병원", imagePath: "/assets/images/client/ref-011.png" },
    { id: 12, name: "맥켄지일신재활병원", imagePath: "/assets/images/client/ref-012.png" },
    { id: 13, name: "베테랑병원", imagePath: "/assets/images/client/ref-013.png" },
    { id: 14, name: "부산365MC", imagePath: "/assets/images/client/ref-014.png" },
    { id: 15, name: "부산나라요양병원", imagePath: "/assets/images/client/ref-015.png" },
    { id: 16, name: "부산본병원", imagePath: "/assets/images/client/ref-016.png" },
    { id: 17, name: "부산우리들병원", imagePath: "/assets/images/client/ref-017.png" },
    { id: 18, name: "삼세한방병원", imagePath: "/assets/images/client/ref-018.png" },
    { id: 19, name: "새봄병원", imagePath: "/assets/images/client/ref-019.png" },
    { id: 20, name: "새우리병원", imagePath: "/assets/images/client/ref-020.png" },
    { id: 21, name: "선샤인피부과", imagePath: "/assets/images/client/ref-021.png" },
    { id: 22, name: "센텀종합병원", imagePath: "/assets/images/client/ref-022.png" },
    { id: 23, name: "수영센텀피부과의원", imagePath: "/assets/images/client/ref-023.png" },
    { id: 24, name: "숨플러스이비인후과", imagePath: "/assets/images/client/ref-024.png" },
    { id: 25, name: "스마트나라요양병원", imagePath: "/assets/images/client/ref-025.png" },
    { id: 26, name: "신세계이비인후과", imagePath: "/assets/images/client/ref-026.png" },
    { id: 27, name: "신세계한방병원", imagePath: "/assets/images/client/ref-027.png" },
    { id: 28, name: "연산당당한방병원", imagePath: "/assets/images/client/ref-028.png" },
    { id: 29, name: "예바치과교정과의원", imagePath: "/assets/images/client/ref-029.png" },
    { id: 30, name: "온치과병원", imagePath: "/assets/images/client/ref-030.png" },
    { id: 31, name: "웰하이여성아동병원", imagePath: "/assets/images/client/ref-031.png" },
    { id: 32, name: "일신기독병원", imagePath: "/assets/images/client/ref-032.png" },
    { id: 33, name: "정관일신기독병원", imagePath: "/assets/images/client/ref-033.png" },
    { id: 34, name: "중앙나라요양병원", imagePath: "/assets/images/client/ref-034.png" },
    { id: 35, name: "진해라온치과병원", imagePath: "/assets/images/client/ref-035.png" },
    { id: 36, name: "큰힘병원", imagePath: "/assets/images/client/ref-036.png" },
    { id: 37, name: "태흥당한방병원", imagePath: "/assets/images/client/ref-037.png" },
    { id: 38, name: "풍경요양병원", imagePath: "/assets/images/client/ref-038.png" },
    { id: 39, name: "핑이비인후과의원", imagePath: "/assets/images/client/ref-039.png" },
    { id: 40, name: "해동병원", imagePath: "/assets/images/client/ref-040.png" },
    { id: 41, name: "해뜨락요양병원", imagePath: "/assets/images/client/ref-041.png" },
    { id: 42, name: "해운대푸른바다병원", imagePath: "/assets/images/client/ref-042.png" },
    { id: 43, name: "화명일신기독병원", imagePath: "/assets/images/client/ref-043.png" },
    { id: 44, name: "힘나는병원", imagePath: "/assets/images/client/ref-044.png" }
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
