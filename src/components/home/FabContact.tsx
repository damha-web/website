"use client";

import { MessageCircle, Phone } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

export default function FabContact() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {/* Kakao Talk */}
            <MagneticWrapper strength={0.3}>
                <a
                    href="https://accounts.kakao.com/login/?continue=http%3A%2F%2Fpf.kakao.com%2F_Jxldks%2Fchat#login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-[#FEE500] text-[#191919] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    aria-label="카카오톡 상담하기"
                >
                    <MessageCircle size={24} fill="currentColor" strokeWidth={1} />
                </a>
            </MagneticWrapper>

            {/* Phone Call */}
            <MagneticWrapper strength={0.3}>
                <a
                    href="tel:051-757-0719"
                    className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    aria-label="전화 상담하기"
                >
                    <Phone size={24} fill="currentColor" strokeWidth={1} />
                </a>
            </MagneticWrapper>
        </div>
    );
}
