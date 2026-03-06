import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { redis } from "@/lib/redis";
import type { NewsItem } from "@/data/news";

const REDIS_KEY = "news-items";

async function readNewsData(): Promise<NewsItem[]> {
  return (await redis.get<NewsItem[]>(REDIS_KEY)) ?? [];
}

async function writeNewsData(items: NewsItem[]): Promise<void> {
  await redis.set(REDIS_KEY, items);
}

// GET: 뉴스 목록 조회
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorizedResponse();
  const items = await readNewsData();
  return NextResponse.json(items);
}

// POST: 뉴스 생성
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  const body = (await request.json()) as Omit<NewsItem, "id">;
  const items = await readNewsData();

  const newItem: NewsItem = {
    ...body,
    id: `news-${Date.now()}`,
  };

  items.unshift(newItem);
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  await writeNewsData(items);

  return NextResponse.json(newItem, { status: 201 });
}

// PUT: 뉴스 수정
export async function PUT(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  const body = (await request.json()) as NewsItem;
  const items = await readNewsData();
  const index = items.findIndex((item) => item.id === body.id);

  if (index === -1) {
    return NextResponse.json(
      { error: "뉴스를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  items[index] = body;
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  await writeNewsData(items);

  return NextResponse.json(body);
}

// DELETE: 뉴스 삭제
export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  const { id } = (await request.json()) as { id: string };
  const items = await readNewsData();
  const filtered = items.filter((item) => item.id !== id);

  if (filtered.length === items.length) {
    return NextResponse.json(
      { error: "뉴스를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  await writeNewsData(filtered);
  return NextResponse.json({ success: true });
}
