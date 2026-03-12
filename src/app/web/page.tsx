import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Script from "next/script";
import WebHero from "@/components/web/WebHero";

const ProblemSection = dynamic(() => import("@/components/web/ProblemSection"));
const WebAboutSection = dynamic(() => import("@/components/web/WebAboutSection"));
const DifferenceSection = dynamic(() => import("@/components/web/DifferenceSection"));
const ServicePricing = dynamic(() => import("@/components/web/ServicePricing"));
const CMSShowcase = dynamic(() => import("@/components/web/CMSShowcase"));
const WebPortfolioGrid = dynamic(() => import("@/components/web/WebPortfolioGrid"));
const ProcessTimeline = dynamic(() => import("@/components/web/ProcessTimeline"));
const ContactForm = dynamic(() => import("@/components/web/ContactForm"));
const WebSubNav = dynamic(() => import("@/components/web/WebSubNav"));
const WebFabCTA = dynamic(() => import("@/components/web/WebFabCTA"));

export const metadata: Metadata = {
    title: "웹제작부 | 병원 홈페이지 전문 제작 — 담하",
    description:
        "기획부터 운영까지, 병원 홈페이지 제작의 모든 것을 책임지는 올인원 파트너. LITE, BASIC, STANDARD 맞춤 상품과 CMS 관리 시스템을 제공합니다.",
    keywords: ["병원 홈페이지", "의료 웹사이트", "병원 마케팅", "CMS", "담하", "웹제작"],
    openGraph: {
        title: "웹제작부 | 병원 홈페이지 전문 제작 — 담하",
        description:
            "기획부터 운영까지, 병원 홈페이지 제작의 모든 것을 책임지는 올인원 파트너.",
        type: "website",
        url: "/web",
        siteName: "담하",
        locale: "ko_KR",
    },
    twitter: {
        card: "summary_large_image",
        title: "웹제작부 | 병원 홈페이지 전문 제작 — 담하",
        description: "기획부터 운영까지, 병원 홈페이지 제작의 모든 것을 책임지는 올인원 파트너.",
    },
    alternates: {
        canonical: "/web",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "병원 홈페이지 전문 제작",
    description: "기획부터 운영까지, 병원 홈페이지 제작의 모든 것을 책임지는 올인원 파트너",
    provider: {
        "@type": "Organization",
        name: "주식회사 담하",
        url: "https://www.damha.kr",
        telephone: "051-757-0719",
        email: "web@damha.co.kr",
        address: {
            "@type": "PostalAddress",
            streetAddress: "연안로59번길 7, 5층",
            addressLocality: "부산광역시 동래구",
            addressCountry: "KR",
        },
    },
    serviceType: "웹사이트 제작",
    areaServed: { "@type": "Country", name: "KR" },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "웹제작 상품",
        itemListElement: [
            {
                "@type": "Offer",
                name: "LITE",
                description: "1인 병원·소형 의원을 위한 원페이지 홈페이지",
                priceCurrency: "KRW",
                price: "5000000",
            },
            {
                "@type": "Offer",
                name: "BASIC",
                description: "지역 병원을 위한 멀티 페이지 홈페이지",
                priceCurrency: "KRW",
                price: "7000000",
            },
            {
                "@type": "Offer",
                name: "STANDARD",
                description: "대형 병원을 위한 맞춤 콘텐츠 기획 홈페이지",
                priceCurrency: "KRW",
                price: "10000000",
            },
        ],
    },
};

function WaveDivider({ from, to }: { from: string; to: string }) {
    return (
        <div className="relative -mt-px -mb-px" style={{ lineHeight: 0 }}>
            <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                <path d="M0 0H1440V24C1440 24 1200 48 720 48C240 48 0 24 0 24V0Z" fill={from} />
                <path d="M0 48H1440V24C1440 24 1200 0 720 0C240 0 0 24 0 24V48Z" fill={to} />
            </svg>
        </div>
    );
}

export default function WebProductionPage() {
    return (
        <div className="w-full relative bg-surface-light">
            <Script
                id="web-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WebSubNav />
            <WebHero />
            <WaveDivider from="#1F1F1F" to="#FAFDFF" />
            <ProblemSection />
            <WebAboutSection />
            <DifferenceSection />
            <ServicePricing />
            <WaveDivider from="#F2FAFF" to="#1F1F1F" />
            <CMSShowcase />
            <WaveDivider from="#1F1F1F" to="#FAFDFF" />
            <WebPortfolioGrid />
            <ProcessTimeline />
            <WaveDivider from="#F2FAFF" to="#1F1F1F" />
            <ContactForm />
            <WebFabCTA />
        </div>
    );
}
