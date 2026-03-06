import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "damha2026!";

export function verifyAdmin(request: NextRequest): boolean {
  const auth = request.headers.get("x-admin-token");
  return auth === ADMIN_PASSWORD;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
}
