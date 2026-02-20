import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary text-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-start mb-16 gap-8">
                    {/* Logo & Info */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-montserrat font-bold">DAMHA</h2>
                        <p className="text-white/60 max-w-sm">
                            병원 특화 종합 마케팅 에이전시.
                            <br /> 차원이 다른 브랜딩과 마케팅 성과를 만들어냅니다.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-semibold mb-2">상담 문의</p>
                        <p className="text-3xl font-bold tracking-tight mb-4 text-primary">02-1234-5678</p>
                        <Link
                            href="#"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-primary transition-colors duration-300 px-6 py-3 rounded-full text-sm"
                        >
                            Contact Us <MoveRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-white/10 mb-8" />

                {/* Info Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/50">
                    <div>
                        <p><strong>주식회사 담하</strong></p>
                        <p>대표이사: 조윤서</p>
                        <p>사업자등록번호: 123-45-67890</p>
                        <p>주소: 서울특별시 강남구 역삼로 123</p>
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
