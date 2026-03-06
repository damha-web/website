import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "주식회사 담하는 병원 전문 마케팅 에이전시로, 10년 이상의 경험을 바탕으로 131개 이상의 병원 브랜딩을 성공적으로 수행했습니다.",
  openGraph: {
    title: "회사소개 — 담하",
    description:
      "10년 이상의 경험, 131개 이상의 병원 브랜딩. 병원 전문 마케팅 에이전시 담하를 소개합니다.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
