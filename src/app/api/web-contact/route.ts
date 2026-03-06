import { NextResponse } from "next/server";

interface ContactPayload {
    hospitalName: string;
    contactName: string;
    phone: string;
    product: string;
    message: string;
}

interface SanitizedContactPayload {
    hospitalName: string;
    contactName: string;
    phone: string;
    product: string;
    message: string;
}

const MAX_MESSAGE_LENGTH = 1000;
const WEBHOOK_TIMEOUT_MS = 3000;

function normalizeText(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function validatePhone(phone: string): boolean {
    const digits = phone.replace(/\D/g, "");
    return /^01[0-9]\d{7,8}$/.test(digits);
}

function maskPhone(phone: string): string {
    const digits = phone.replace(/\D/g, "");

    if (digits.length < 7) return "***";

    return `${digits.slice(0, 3)}-****-${digits.slice(-4)}`;
}

function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

function createKakaoWorkMessage(payload: SanitizedContactPayload): string {
    const lines = [
        `[웹제작부] 새 상담 신청`,
        `병원: ${payload.hospitalName}`,
        `담당자: ${payload.contactName}`,
        `연락처: ${payload.phone}`,
        `상품: ${payload.product}`,
    ];

    if (payload.message) {
        lines.push(`문의 내용: ${payload.message}`);
    }

    return lines.join("\n");
}

async function sendKakaoWorkNotification(payload: SanitizedContactPayload): Promise<void> {
    const webhookUrl = process.env.KAKAOWORK_WEBHOOK_URL?.trim();
    if (!webhookUrl) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: createKakaoWorkMessage(payload) }),
            signal: controller.signal,
        });

        if (!response.ok) {
            const responseBody = await response.text();
            console.error("[웹제작부 문의] 카카오워크 알림 실패", {
                status: response.status,
                statusText: response.statusText,
                response: truncateText(responseBody, 300),
                hospitalName: payload.hospitalName,
                contactName: payload.contactName,
                phone: maskPhone(payload.phone),
            });
        }
    } catch (error) {
        console.error("[웹제작부 문의] 카카오워크 알림 예외", {
            reason: error instanceof Error ? error.message : String(error),
            hospitalName: payload.hospitalName,
            contactName: payload.contactName,
            phone: maskPhone(payload.phone),
        });
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as Partial<ContactPayload>;
        const sanitizedBody: SanitizedContactPayload = {
            hospitalName: normalizeText(body.hospitalName),
            contactName: normalizeText(body.contactName),
            phone: normalizeText(body.phone),
            product: normalizeText(body.product),
            message: truncateText(normalizeText(body.message), MAX_MESSAGE_LENGTH),
        };

        const { hospitalName, contactName, phone, product, message } = sanitizedBody;

        // 필수 필드 검증
        if (!hospitalName || !contactName || !phone || !product) {
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

        const webhookExists = !!process.env.KAKAOWORK_WEBHOOK_URL;
        console.log("[웹제작부 문의] WEBHOOK 환경변수 존재:", webhookExists);

        await sendKakaoWorkNotification(sanitizedBody);

        console.log("[웹제작부 문의]", {
            hospitalName,
            contactName,
            phone: maskPhone(phone),
            product,
            message,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, message: "상담 신청이 접수되었습니다." });
    } catch (error) {
        console.error("[웹제작부 문의] 요청 처리 오류", {
            reason: error instanceof Error ? error.message : String(error),
        });

        return NextResponse.json(
            { error: "요청 처리 중 오류가 발생했습니다." },
            { status: 500 },
        );
    }
}
