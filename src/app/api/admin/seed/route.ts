import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorizedResponse } from "@/lib/admin-auth";
import { redis } from "@/lib/redis";
import type { NewsItem } from "@/data/news";

const SEED_DATA: NewsItem[] = [
  {
    title: "담하, 국제표준화기구로부터 'ISO 9001, ISO 14001' 동시 인증 취득",
    category: "소식",
    thumbnail: "/assets/images/news/1772690322059-news.webp",
    source: "보건뉴스",
    date: "2026-03-05",
    link: "http://www.bokuennews.com/news/article.html?no=244827",
    published: true,
    featured: true,
    id: "news-1772690348598",
  },
  {
    title: "주식회사 담하, 광고 마케팅 프로세스 특허 출원",
    category: "보도자료",
    thumbnail: "/assets/images/news/1772689716566-news.webp",
    source: "보건뉴스",
    date: "2026-03-05",
    link: "http://www.bokuennews.com/news/article.html?no=256914",
    published: true,
    featured: true,
    id: "news-1772689752792",
  },
  {
    title: "주식회사 담하, '병원행정관리학회 2025년 정기 종합학술대회' 공로패 수상",
    category: "보도자료",
    thumbnail: "/assets/images/news/1772689455470-news.webp",
    source: "보건 뉴스",
    date: "2026-03-05",
    link: "http://www.bokuennews.com/news/article.html?no=266331",
    published: true,
    featured: true,
    id: "news-1772689492701",
  },
  {
    id: "news-001",
    title: "담하, 2026년 병원 마케팅 트렌드 리포트 발간",
    category: "보도자료",
    thumbnail: "/assets/images/news/sample-01.webp",
    source: "담하 마케팅팀",
    date: "2026-03-04",
    link: "#",
    published: true,
    featured: true,
  },
  {
    id: "news-002",
    title: "성형외과 브랜딩 프로젝트 성공 사례 공개",
    category: "블로그",
    thumbnail: "/assets/images/news/sample-02.webp",
    source: "담하 블로그",
    date: "2026-02-28",
    link: "#",
    published: true,
    featured: true,
  },
  {
    id: "news-003",
    title: "의료기관 디지털 전환 세미나 개최 안내",
    category: "이벤트",
    thumbnail: "/assets/images/news/sample-03.webp",
    source: "담하",
    date: "2026-02-20",
    link: "#",
    published: true,
    featured: true,
  },
  {
    id: "news-004",
    title: "담하 웹제작부, 병원 전용 CMS 솔루션 출시",
    category: "소식",
    thumbnail: "/assets/images/news/sample-04.webp",
    source: "담하 개발팀",
    date: "2026-02-15",
    link: "#",
    published: true,
    featured: false,
  },
  {
    id: "news-005",
    title: "2025년 하반기 포트폴리오 업데이트",
    category: "소식",
    thumbnail: "/assets/images/news/sample-05.webp",
    source: "담하",
    date: "2026-01-30",
    link: "#",
    published: true,
    featured: false,
  },
  {
    id: "news-006",
    title: "피부과·치과 온라인 광고 효율 분석 보고서",
    category: "보도자료",
    thumbnail: "/assets/images/news/sample-06.webp",
    source: "담하 마케팅팀",
    date: "2026-01-15",
    link: "#",
    published: true,
    featured: false,
  },
];

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  const existing = await redis.get("news-items");
  if (existing) {
    return NextResponse.json(
      { error: "이미 데이터가 존재합니다." },
      { status: 409 }
    );
  }

  await redis.set("news-items", SEED_DATA);
  return NextResponse.json({ success: true, count: SEED_DATA.length });
}
