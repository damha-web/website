export interface ProcessStep {
    step: number;
    title: string;
    description: string;
    detail: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
    {
        step: 1,
        title: "문의",
        description: "폼 / 전화",
        detail: "홈페이지 또는 전화를 통해 프로젝트를 문의합니다.",
    },
    {
        step: 2,
        title: "상담",
        description: "니즈 파악",
        detail: "병원의 현재 상황과 목표를 파악하고 최적의 상품을 제안합니다.",
    },
    {
        step: 3,
        title: "기획",
        description: "구조 설계",
        detail: "사이트 구조와 콘텐츠를 기획하고 정보 아키텍처를 설계합니다.",
    },
    {
        step: 4,
        title: "디자인",
        description: "브랜딩 반영",
        detail: "병원 아이덴티티를 반영한 시각 디자인을 제작합니다.",
    },
    {
        step: 5,
        title: "퍼블리싱",
        description: "반응형 구현",
        detail: "모든 디바이스에 최적화된 반응형 웹을 구현합니다.",
    },
    {
        step: 6,
        title: "개발",
        description: "기능 개발",
        detail: "CMS 연동, 예약 시스템 등 필요한 기능을 개발합니다.",
    },
    {
        step: 7,
        title: "오픈",
        description: "임시 → 정식",
        detail: "임시 사이트로 최종 확인 후 정식 오픈합니다.",
    },
    {
        step: 8,
        title: "유지관리",
        description: "6개월 무상",
        detail: "호스팅, 도메인, 인증서 관리 및 콘텐츠 수정을 지원합니다.",
    },
];
