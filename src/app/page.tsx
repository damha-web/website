import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";

// Dynamically import heavy components with code splitting
const Products = dynamic(() => import("@/components/home/Products"));
const PhilosophySection = dynamic(() => import("@/components/home/PhilosophySection"));
const ShaderCallout = dynamic(() => import("@/components/home/ShaderCallout"));
const PortfolioPreview = dynamic(() => import("@/components/home/PortfolioPreview"));
const TrustSection = dynamic(() => import("@/components/home/TrustSection"));
const FabContact = dynamic(() => import("@/components/home/FabContact"));

export default function Home() {
  return (
    <div className="w-full relative bg-surface-light">
      <Hero />
      <Products />
      <PhilosophySection />
      <ShaderCallout />
      <PortfolioPreview />
      <TrustSection />

      <FabContact />
    </div>
  );
}
