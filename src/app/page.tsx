import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import TrustSection from "@/components/home/TrustSection";
import FabContact from "@/components/home/FabContact";
import ShaderCallout from "@/components/home/ShaderCallout";
import { CanvasTrailEffect } from "@/components/ui/canvas-trail-effect";

export default function Home() {
  return (
    <div className="w-full relative">
      {/* 마우스 트레일 캔버스 효과 - 페이지 전체 배경 */}
      <CanvasTrailEffect />

      <Hero />
      <Products />
      <ShaderCallout />
      <PortfolioPreview />
      <TrustSection />

      <FabContact />
    </div>
  );
}
