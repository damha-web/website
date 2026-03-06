import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스",
  description:
    "브랜딩, 마케팅, 경영컨설팅, 오프라인 광고까지. 병원에 필요한 모든 마케팅 서비스를 제공합니다.",
  openGraph: {
    title: "서비스 — 담하",
    description:
      "브랜딩, 마케팅, 경영컨설팅, 오프라인 광고. 병원 마케팅의 모든 것을 담하에서.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
