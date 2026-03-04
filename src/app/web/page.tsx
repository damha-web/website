import dynamic from "next/dynamic";
import type { Metadata } from "next";
import WebHero from "@/components/web/WebHero";

const ProblemSection = dynamic(() => import("@/components/web/ProblemSection"));
const WebAboutSection = dynamic(() => import("@/components/web/WebAboutSection"));
const DifferenceSection = dynamic(() => import("@/components/web/DifferenceSection"));
const ServicePricing = dynamic(() => import("@/components/web/ServicePricing"));
const CMSShowcase = dynamic(() => import("@/components/web/CMSShowcase"));
const WebPortfolioGrid = dynamic(() => import("@/components/web/WebPortfolioGrid"));
const ProcessTimeline = dynamic(() => import("@/components/web/ProcessTimeline"));
const ContactForm = dynamic(() => import("@/components/web/ContactForm"));
const FabContact = dynamic(() => import("@/components/home/FabContact"));

export const metadata: Metadata = {
    title: "웹제작부 | 병원 홈페이지 전문 제작 — 담하",
    description:
        "기획부터 운영까지, 병원 홈페이지 제작의 모든 것을 책임지는 올인원 파트너. LITE, BASIC, STANDARD 맞춤 상품과 CMS 관리 시스템을 제공합니다.",
    openGraph: {
        title: "웹제작부 | 병원 홈페이지 전문 제작 — 담하",
        description:
            "기획부터 운영까지, 병원 홈페이지 제작의 모든 것을 책임지는 올인원 파트너.",
        type: "website",
    },
};

export default function WebProductionPage() {
    return (
        <div className="w-full relative bg-surface-light">
            <WebHero />
            <ProblemSection />
            <WebAboutSection />
            <DifferenceSection />
            <ServicePricing />
            <CMSShowcase />
            <WebPortfolioGrid />
            <ProcessTimeline />
            <ContactForm />
            <FabContact />
        </div>
    );
}
