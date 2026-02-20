import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-surface-alt">
        <div className="absolute inset-0 w-full h-full z-0 opacity-20 bg-[url('/assets/hero-bg.svg')] bg-cover bg-center" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-2 border border-primary/20 bg-primary/5 rounded-full mb-6">
            <span className="text-primary font-semibold tracking-wide text-sm font-montserrat">
              WE ARE DAMHA
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-secondary mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
            당신의 성공이<br />
            우리의 레퍼런스입니다
          </h1>
          <p className="text-xl md:text-2xl text-text-sub max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            병원 특화 브랜딩부터 마케팅, 컨설팅까지<br />
            차원이 다른 성과를 만들어내는 프리미엄 에이전시.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-accent transition-all duration-300 shadow-[0_8px_30px_rgb(228,123,65,0.3)] hover:shadow-[0_8px_40px_rgb(228,123,65,0.4)] hover:-translate-y-1"
            >
              포트폴리오 보기
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 bg-white text-text-main border border-gray-200 text-lg font-bold rounded-full hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              우리의 서비스 <MoveRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-text-sub text-sm font-medium mb-2 font-montserrat">SCROLL</span>
        <div className="w-0.5 h-16 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </div>
  );
}
