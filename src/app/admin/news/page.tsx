"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { getAdminToken } from "../layout";
import type { NewsItem } from "@/data/news";
import { categoryColors } from "@/data/news";

const MAX_FEATURED = 6;

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/admin/news", {
      headers: { "x-admin-token": getAdminToken() },
    });
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = useCallback(
    async (id: string, title: string) => {
      if (!confirm(`"${title}" 뉴스를 삭제하시겠습니까?`)) return;
      await fetch("/api/admin/news", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getAdminToken(),
        },
        body: JSON.stringify({ id }),
      });
      fetchItems();
    },
    [fetchItems]
  );

  const handleToggle = useCallback(
    async (item: NewsItem, field: "published" | "featured") => {
      if (field === "featured" && !item.featured) {
        const featuredCount = items.filter((i) => i.featured).length;
        if (featuredCount >= MAX_FEATURED) {
          alert(`메인 노출은 최대 ${MAX_FEATURED}개까지 가능합니다.`);
          return;
        }
      }
      await fetch("/api/admin/news", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getAdminToken(),
        },
        body: JSON.stringify({ ...item, [field]: !item[field] }),
      });
      fetchItems();
    },
    [fetchItems, items]
  );

  const featuredCount = items.filter((i) => i.featured).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        불러오는 중...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            뉴스 관리{" "}
            <span className="text-sm font-normal text-gray-400">
              ({items.length}건)
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            메인 노출: {featuredCount}/{MAX_FEATURED}개
          </p>
        </div>
        <a
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />새 글 작성
        </a>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                상태
              </th>
              <th className="text-center px-3 py-3 font-medium text-gray-500">
                메인
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                카테고리
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                제목
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                날짜
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">
                관리
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggle(item, "published")}
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      item.published
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {item.published ? (
                      <Eye size={12} />
                    ) : (
                      <EyeOff size={12} />
                    )}
                    {item.published ? "발행" : "미발행"}
                  </button>
                </td>
                <td className="px-3 py-3 text-center">
                  <button
                    onClick={() => handleToggle(item, "featured")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.featured
                        ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                        : "text-gray-300 hover:bg-gray-100 hover:text-gray-400"
                    }`}
                    title={item.featured ? "메인 노출 해제" : "메인 노출 설정"}
                  >
                    <Star
                      size={16}
                      fill={item.featured ? "currentColor" : "none"}
                    />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs font-bold"
                    style={{ color: categoryColors[item.category] }}
                  >
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-900 font-medium">
                    {item.title}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={`/admin/news/${item.id}/edit`}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                      <Pencil size={14} />
                    </a>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  등록된 뉴스가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
