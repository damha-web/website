"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { slideInFromLeft, slideInFromRight } from "@/lib/animation-variants";

type ProductInterest = "LITE" | "BASIC" | "STANDARD" | "모르겠어요";

interface FormData {
    hospitalName: string;
    contactName: string;
    phone: string;
    product: ProductInterest;
    message: string;
}

function formatMobilePhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;

    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function isValidMobilePhone(value: string): boolean {
    return /^01[0-9]-\d{3,4}-\d{4}$/.test(value);
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        hospitalName: "",
        contactName: "",
        phone: "",
        product: "모르겠어요",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);

    const phoneHasError =
        isPhoneTouched && formData.phone.length > 0 && !isValidMobilePhone(formData.phone);

    const handlePhoneChange = (value: string) => {
        const formattedPhone = formatMobilePhone(value);
        setFormData({ ...formData, phone: formattedPhone });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isValidMobilePhone(formData.phone)) {
            setIsPhoneTouched(true);
            setError("연락처는 010-1234-5678 형식으로 입력해주세요.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/web-contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? "오류가 발생했습니다.");
                return;
            }

            setIsSubmitted(true);
        } catch {
            setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const productOptions: { value: ProductInterest; label: string }[] = [
        { value: "LITE", label: "LITE (~500만원)" },
        { value: "BASIC", label: "BASIC (700만원~)" },
        { value: "STANDARD", label: "STANDARD (1,000만원~)" },
        { value: "모르겠어요", label: "모르겠어요 (상담 희망)" },
    ];

    return (
        <section id="contact" className="py-24 md:py-32 bg-[#1F1F1F]">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-widest text-sm font-montserrat uppercase mb-4 block">
                        Contact
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight break-keep mb-4">
                        당신의 병원 홈페이지,
                        <br />
                        <span className="text-primary">새로운 관점</span>에서 만들겠습니다.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left - Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={slideInFromLeft}
                    >
                        {isSubmitted ? (
                            <div className="bg-white/5 rounded-3xl border border-white/10 p-12 text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                    <Send size={28} className="text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">상담 신청 완료</h3>
                                <p className="text-white/60 break-keep">
                                    빠른 시일 내에 담당자가 연락드리겠습니다.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-white/60 text-sm font-medium mb-2">병원명</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.hospitalName}
                                        onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                        className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                                        placeholder="병원명을 입력해주세요"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-white/60 text-sm font-medium mb-2">담당자명</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.contactName}
                                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                                            placeholder="이름"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/60 text-sm font-medium mb-2">연락처</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => handlePhoneChange(e.target.value)}
                                            onBlur={() => setIsPhoneTouched(true)}
                                            inputMode="numeric"
                                            autoComplete="tel"
                                            maxLength={13}
                                            className={`w-full px-5 py-3 bg-white/5 border rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-colors ${
                                                phoneHasError
                                                    ? "border-red-400/70 focus:border-red-400/70 focus:ring-red-400/20"
                                                    : "border-white/10 focus:border-primary/50 focus:ring-primary/20"
                                            }`}
                                            placeholder="010-0000-0000"
                                        />
                                        {phoneHasError && (
                                            <p className="mt-2 text-xs text-red-400">
                                                휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/60 text-sm font-medium mb-2">관심 상품</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {productOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, product: opt.value })}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                                                    formData.product === opt.value
                                                        ? "bg-primary/20 border-primary/50 text-primary"
                                                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                                                }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/60 text-sm font-medium mb-2">문의 내용</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                                        placeholder="간단한 문의 내용을 남겨주세요 (선택)"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "전송 중..." : "상담 신청하기"}
                                    {!isLoading && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Right - Contact Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={slideInFromRight}
                        className="space-y-8 lg:pl-8"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">직접 연락하기</h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                        <Mail size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-sm mb-1">Email</p>
                                        <p className="text-white font-medium">web@damha.co.kr</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                        <Phone size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-sm mb-1">Tel</p>
                                        <p className="text-white font-medium">051-757-0719</p>
                                        <p className="text-white/60 text-sm">070-5089-2631</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                        <MapPin size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-sm mb-1">Address</p>
                                        <p className="text-white font-medium break-keep">
                                            부산광역시 동래구 연안로 59번길 7
                                        </p>
                                        <p className="text-white/60 text-sm">엘엔케이빌딩 5층</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operating hours */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <h4 className="text-white font-bold mb-3">상담 가능 시간</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)
                                <br />
                                주말 및 공휴일 휴무
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
