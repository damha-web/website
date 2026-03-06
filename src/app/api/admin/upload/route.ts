import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { verifyAdmin, unauthorizedResponse } from "@/lib/admin-auth";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_WIDTH = 800;
const WEBP_QUALITY = 80;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string) || "news";

  if (!file) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "파일 크기가 10MB를 초과합니다." },
      { status: 400 }
    );
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "JPG, PNG, WebP, AVIF만 업로드 가능합니다." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const timestamp = Date.now();
  const slug = slugify(title);
  const filename = `${timestamp}-${slug}.webp`;

  const metadata = await sharp(buffer).metadata();
  const originalSize = buffer.length;

  const optimized = await sharp(buffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  const blob = await put(`news/${filename}`, optimized, {
    access: "public",
    contentType: "image/webp",
  });

  return NextResponse.json({
    path: blob.url,
    filename,
    original: {
      size: originalSize,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    },
    optimized: {
      size: optimized.length,
      width: Math.min(metadata.width ?? MAX_WIDTH, MAX_WIDTH),
      format: "webp",
    },
    savings: `${Math.round((1 - optimized.length / originalSize) * 100)}%`,
  });
}
