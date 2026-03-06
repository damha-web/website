import { redis } from "@/lib/redis";
import { fallbackNewsItems } from "@/data/news";
import type { NewsItem } from "@/data/news";

export const revalidate = 60;

export async function GET() {
  try {
    const items = (await redis.get<NewsItem[]>("news-items")) ?? [];
    const featured = items.filter((item) => item.published && item.featured);
    if (featured.length > 0) return Response.json(featured);
  } catch {
    // Redis 미연결 시 (로컬 개발 등) 폴백 사용
  }
  return Response.json(fallbackNewsItems);
}
