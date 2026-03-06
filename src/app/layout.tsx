import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FabContact from "@/components/layout/FabContact";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const SITE_URL = "https://website-r1cs.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "담하 | 병원 전문 마케팅 에이전시",
    template: "%s — 담하",
  },
  description: "병원 특화 종합 브랜딩, 마케팅, 경영컨설팅 에이전시 담하입니다.",
  keywords: ["병원 마케팅", "의료 브랜딩", "병원 컨설팅", "담하", "병원 홈페이지"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "담하 | 병원 전문 마케팅 에이전시",
    description: "병원 특화 종합 브랜딩, 마케팅, 경영컨설팅 에이전시 담하입니다.",
    url: SITE_URL,
    siteName: "담하",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/assets/images/pc001007479.jpg",
        width: 1200,
        height: 630,
        alt: "담하 - 병원 전문 마케팅 에이전시",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "담하 | 병원 전문 마케팅 에이전시",
    description: "병원 특화 종합 브랜딩, 마케팅, 경영컨설팅 에이전시 담하입니다.",
    images: ["/assets/images/pc001007479.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${montserrat.variable} font-sans flex flex-col min-h-screen bg-background text-foreground antialiased`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FabContact />
      </body>
    </html>
  );
}
