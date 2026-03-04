export type WebGrade = "LITE" | "BASIC" | "STANDARD" | "별도협의";
export type MedicalDept = "내과" | "정형외과" | "피부과" | "한의원" | "한방병원" | "이비인후과" | "산부인과" | "종합병원" | "외과" | "신경외과" | "재활의학과" | "마취통증의학과" | "신경과";

export interface WebPortfolioItem {
    id: string;
    name: string;
    grade: WebGrade;
    date: string;
    url: string;
    keywords: string[];
    departments: MedicalDept[];
    thumbnail: string;
}

export const WEB_PORTFOLIO: WebPortfolioItem[] = [
    {
        id: "dadaejeong",
        name: "다대정내과",
        grade: "LITE",
        date: "2026.02",
        url: "다대정내과.com",
        keywords: ["내과", "건강검진센터"],
        departments: ["내과"],
        thumbnail: "/assets/images/portfolio/dadaejeong.jpg",
    },
    {
        id: "wooyoungha",
        name: "우영하척정형외과의원",
        grade: "LITE",
        date: "2025.05",
        url: "우영하척정형외과.com",
        keywords: ["관절", "척추", "비수술치료"],
        departments: ["정형외과"],
        thumbnail: "/assets/images/portfolio/wooyoungha.jpg",
    },
    {
        id: "dangdang-ss",
        name: "당당한의원 대구수성",
        grade: "LITE",
        date: "2024.01",
        url: "yesdang-ss.co.kr",
        keywords: ["한의원", "체형교정", "턱관절"],
        departments: ["한의원"],
        thumbnail: "/assets/images/portfolio/dangdang-ss.jpg",
    },
    {
        id: "pingent",
        name: "핑이비인후과의원",
        grade: "LITE",
        date: "2023.06",
        url: "pingent.co.kr",
        keywords: ["이비인후과", "신경과"],
        departments: ["이비인후과", "신경과"],
        thumbnail: "/assets/images/portfolio/pingent.jpg",
    },
    {
        id: "solid-derma",
        name: "솔리드피부과의원",
        grade: "LITE",
        date: "2025.07",
        url: "solid-derma.com",
        keywords: ["피부과전문의", "리프팅", "피부질환"],
        departments: ["피부과"],
        thumbnail: "/assets/images/portfolio/solid-derma.jpg",
    },
    {
        id: "gowoonbim",
        name: "고운빔의원",
        grade: "LITE",
        date: "2026.01",
        url: "gowoonbim.com",
        keywords: ["피부과"],
        departments: ["피부과"],
        thumbnail: "/assets/images/portfolio/gowoonbim.jpg",
    },
    {
        id: "hadanwomen",
        name: "권현영산부인과의원",
        grade: "LITE",
        date: "2025.03",
        url: "hadanwomenclinic.com",
        keywords: ["부인과", "여성성형"],
        departments: ["산부인과"],
        thumbnail: "/assets/images/portfolio/hadanwomen.jpg",
    },
    {
        id: "ssgmedi",
        name: "신세계한방병원",
        grade: "LITE",
        date: "2024.08",
        url: "ssgmedi.co.kr",
        keywords: ["한방병원"],
        departments: ["한방병원"],
        thumbnail: "/assets/images/portfolio/ssgmedi.jpg",
    },
    {
        id: "kybos",
        name: "김영복정형외과",
        grade: "LITE",
        date: "2026.02",
        url: "kybos.co.kr",
        keywords: ["정형외과", "내과", "마취통증의학과"],
        departments: ["정형외과", "내과", "마취통증의학과"],
        thumbnail: "/assets/images/portfolio/kybos.jpg",
    },
    {
        id: "dangdang-cw",
        name: "창원당당한방병원",
        grade: "STANDARD",
        date: "2025.11",
        url: "yesdang-cw.com",
        keywords: ["한방병원", "내과", "건강검진센터"],
        departments: ["한방병원", "내과"],
        thumbnail: "/assets/images/portfolio/dangdang-cw.jpg",
    },
    {
        id: "pureunskin",
        name: "해운대푸른바다병원 피부과",
        grade: "STANDARD",
        date: "2025.08",
        url: "pureunskin.com",
        keywords: ["피부과"],
        departments: ["피부과"],
        thumbnail: "/assets/images/portfolio/pureunskin.jpg",
    },
    {
        id: "minamhospital",
        name: "부산미남병원",
        grade: "STANDARD",
        date: "2024.10",
        url: "minamhospital.com",
        keywords: ["관절", "척추", "내과"],
        departments: ["정형외과", "내과"],
        thumbnail: "/assets/images/portfolio/minamhospital.jpg",
    },
    {
        id: "qhosp",
        name: "큐병원",
        grade: "별도협의",
        date: "2025.07",
        url: "qhosp.co.kr",
        keywords: ["정형외과", "외과", "내과"],
        departments: ["정형외과", "외과", "내과"],
        thumbnail: "/assets/images/portfolio/qhosp.jpg",
    },
    {
        id: "geo-in",
        name: "거인병원",
        grade: "별도협의",
        date: "2025.04",
        url: "geo-in.co.kr",
        keywords: ["정형외과", "신경외과", "재활의학과"],
        departments: ["정형외과", "신경외과", "재활의학과"],
        thumbnail: "/assets/images/portfolio/geo-in.jpg",
    },
    {
        id: "dangdang-ys",
        name: "연산당당한방병원",
        grade: "별도협의",
        date: "2024.11",
        url: "yesdang-ys.com",
        keywords: ["한방병원", "내과", "건강검진센터"],
        departments: ["한방병원", "내과"],
        thumbnail: "/assets/images/portfolio/dangdang-ys.jpg",
    },
];

export const GRADE_FILTERS: WebGrade[] = ["LITE", "STANDARD", "별도협의"];
export const DEPT_FILTERS: string[] = ["내과", "정형외과", "피부과", "한의원", "한방병원", "이비인후과", "산부인과", "종합병원"];
