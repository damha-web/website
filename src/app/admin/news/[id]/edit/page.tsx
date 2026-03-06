"use client";

import { useState, useEffect, use } from "react";
import { getAdminToken } from "../../../layout";
import NewsForm from "../../_components/NewsForm";
import type { NewsItem } from "@/data/news";

export default function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/news", {
        headers: { "x-admin-token": getAdminToken() },
      });
      if (res.ok) {
        const items: NewsItem[] = await res.json();
        const found = items.find((i) => i.id === id);
        setItem(found ?? null);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        불러오는 중...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        뉴스를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">글 수정</h2>
      <NewsForm initialData={item} />
    </div>
  );
}
