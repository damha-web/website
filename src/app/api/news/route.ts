import { redis } from "@/lib/redis";
import type { NewsItem } from "@/data/news";

export const revalidate = 60;

export async function GET() {
  const items = (await redis.get<NewsItem[]>("news-items")) ?? [];
  const featured = items.filter((item) => item.published && item.featured);
  return Response.json(featured);
}
