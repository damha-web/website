export interface CMSFeature {
    id: string;
    tab: string;
    title: string;
    description: string;
    highlights: string[];
}

export const CMS_FEATURES: CMSFeature[] = [
    {
        id: "site-settings",
        tab: "사이트 설정",
        title: "사이트 기본 설정",
        description: "홈페이지 제목, 도메인, 방문자분석 스크립트 등을 간편하게 관리할 수 있습니다.",
        highlights: ["홈페이지 제목 설정", "도메인 관리", "방문자분석 스크립트 삽입"],
    },
    {
        id: "basic-info",
        tab: "기본 정보",
        title: "기본 정보 설정",
        description: "시작페이지, 회사 정보, 네이버 지도 API 등을 설정합니다.",
        highlights: ["시작페이지 설정", "회사 기본 정보", "네이버 지도 API 연동"],
    },
    {
        id: "schedule",
        tab: "진료일정",
        title: "진료일정 관리",
        description: "운영시간 수정, 공통 안내사항, 시간 표시 설정을 관리합니다.",
        highlights: ["운영시간 수정", "공통 안내사항 설정", "시간 표시 커스터마이징"],
    },
    {
        id: "doctors",
        tab: "의료진",
        title: "의료진 관리",
        description: "의료진 프로필 등록, 주간 일정, 약력 관리 및 순서를 변경할 수 있습니다.",
        highlights: ["프로필 등록/수정", "주간 일정 관리", "약력 관리", "드래그 순서 변경"],
    },
    {
        id: "popup",
        tab: "팝업",
        title: "팝업 관리",
        description: "노출 기간, 스타일(슬라이드/탭/컬럼), 링크 연결 등을 설정합니다.",
        highlights: ["노출 기간 설정", "다양한 스타일 옵션", "링크 연결"],
    },
    {
        id: "quick-menu",
        tab: "퀵메뉴",
        title: "퀵메뉴 관리",
        description: "전화상담, 카카오톡, 네이버예약 등 빠른 연결 메뉴를 관리합니다.",
        highlights: ["전화상담 링크", "카카오톡 연결", "네이버예약 링크"],
    },
    {
        id: "main-slide",
        tab: "메인 슬라이드",
        title: "메인 슬라이드 관리",
        description: "PC/Mobile 이미지를 등록하고 노출 여부를 설정합니다.",
        highlights: ["PC/Mobile 이미지 등록", "노출/미노출 설정", "슬라이드 순서 관리"],
    },
    {
        id: "tour",
        tab: "둘러보기",
        title: "둘러보기 관리",
        description: "시설 이미지 갤러리를 구성하고 드래그로 순서를 변경할 수 있습니다.",
        highlights: ["시설 이미지 갤러리", "드래그 순서 변경", "이미지 등록/삭제"],
    },
    {
        id: "equipment",
        tab: "장비",
        title: "장비 관리",
        description: "보유 장비명, 설명, 별도 페이지 노출 설정을 관리합니다.",
        highlights: ["장비 정보 등록", "상세 설명 작성", "페이지 노출 설정"],
    },
    {
        id: "consultation",
        tab: "상담",
        title: "상담 관리",
        description: "빠른상담 DB를 확인하고 메모, 문자알림 연동을 관리합니다.",
        highlights: ["상담 DB 확인", "메모 기능", "문자알림 연동"],
    },
    {
        id: "board",
        tab: "게시판",
        title: "게시판 관리",
        description: "공지사항, 온라인상담, 이벤트, 전후사진, 치료후기 등 5개 게시판을 관리합니다.",
        highlights: ["공지사항", "온라인상담", "이벤트", "전후사진", "치료후기"],
    },
    {
        id: "monthly-schedule",
        tab: "월별 진료",
        title: "월별 진료일정 관리",
        description: "캘린더 기반으로 의료진별 일정을 관리하는 옵션 기능입니다.",
        highlights: ["캘린더 기반 UI", "의료진별 일정 관리", "옵션 기능"],
    },
];
