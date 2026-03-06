export type NewsCategory = "소식" | "보도자료" | "블로그" | "이벤트";

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  thumbnail: string;
  source: string;
  date: string;
  link: string;
  published: boolean;
  featured: boolean;
}

export const categoryColors: Record<NewsCategory, string> = {
  소식: "#D60000",
  보도자료: "#3B82F6",
  블로그: "#10B981",
  이벤트: "#F59E0B",
};

