import { NextResponse } from "next/server";

interface ContactPayload {
    hospitalName: string;
    contactName: string;
    phone: string;
    product: string;
    message: string;
}

function validatePhone(phone: string): boolean {
    return /^[\d\-]{9,15}$/.test(phone.replace(/\s/g, ""));
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ContactPayload;

        const { hospitalName, contactName, phone, product } = body;

        // 필수 필드 검증
        if (!hospitalName?.trim() || !contactName?.trim() || !phone?.trim() || !product?.trim()) {
            return NextResponse.json(
                { error: "필수 항목을 모두 입력해주세요." },
                { status: 400 },
            );
        }

        if (!validatePhone(phone)) {
            return NextResponse.json(
                { error: "올바른 연락처 형식이 아닙니다." },
                { status: 400 },
            );
        }

        // TODO: 이메일 발송 연동 (Resend/Nodemailer)
        // 현재는 콘솔 로그로 대체
        console.log("[웹제작부 문의]", {
            hospitalName: hospitalName.trim(),
            contactName: contactName.trim(),
            phone: phone.trim(),
            product,
            message: body.message?.trim() ?? "",
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, message: "상담 신청이 접수되었습니다." });
    } catch {
        return NextResponse.json(
            { error: "요청 처리 중 오류가 발생했습니다." },
            { status: 500 },
        );
    }
}
