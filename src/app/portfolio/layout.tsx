import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "담하가 수행한 병원 브랜딩, 마케팅, 웹사이트 제작 프로젝트를 확인하세요.",
  openGraph: {
    title: "포트폴리오 — 담하",
    description:
      "병원 브랜딩, 마케팅, 웹사이트 제작. 담하의 프로젝트 성과를 확인하세요.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
