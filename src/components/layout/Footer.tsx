import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#181818] text-white py-16 md:py-24 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
                    {/* Logo & Info */}
                    <div className="space-y-6">
                        <img src="/assets/images/logo_allWhite.svg" alt="DAMHA" className="h-10 w-auto" />
                        <p className="text-white/60 max-w-sm">
                            병원 특화 종합 마케팅 에이전시.
                            <br /> 차원이 다른 브랜딩과 마케팅 성과를 만들어냅니다.
                        </p>
                    </div>

                    {/* Certifications (Aligned Left) */}
                    <div className="flex justify-start items-center">
                        <img
                            src="/assets/images/7331034dac.svg"
                            alt="인증 및 파트너"
                            style={{ height: '112px' }}
                            className="w-auto transition-opacity duration-500 hover:opacity-80 cursor-pointer"
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="md:text-right">
                        <p className="text-xl font-semibold mb-2 text-white/80">상담 문의</p>
                        <p className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-primary">051.757.0719</p>
                        <p className="text-lg font-medium text-white/60 mb-6">M. 010.2983.4744</p>
                        <Link
                            href="mailto:brand@damha.co.kr"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-primary transition-colors duration-300 px-6 py-3 rounded-full text-sm"
                        >
                            brand@damha.co.kr <MoveRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-white/10 mb-8" />

                {/* Info Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/50">
                    <div>
                        <p><strong className="text-white">주식회사 담하</strong></p>
                        <p>대표이사: 정승우</p>
                        <p>사업자등록번호: 247-81-03001</p>
                        <p>주소: 부산광역시 동래구 연안로59번길 7, 5층</p>
                    </div>
                    <div className="md:text-right space-y-2">
                        <nav className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 mb-4">
                            <Link href="/about" className="hover:text-white transition-colors">회사소개</Link>
                            <Link href="/services" className="hover:text-white transition-colors">서비스</Link>
                            <Link href="/portfolio" className="hover:text-white transition-colors">포트폴리오</Link>
                            <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
                            <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
                        </nav>
                        <p>&copy; {new Date().getFullYear()} DAMHA. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
