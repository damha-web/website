"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, ImageIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { getAdminToken } from "../../layout";
import type { NewsItem, NewsCategory } from "@/data/news";

const CATEGORIES: NewsCategory[] = ["소식", "보도자료", "블로그", "이벤트"];

interface NewsFormProps {
  initialData?: NewsItem;
}

interface UploadResult {
  path: string;
  original: { size: number; width: number; height: number; format: string };
  optimized: { size: number; width: number; format: string };
  savings: string;
}

export default function NewsForm({ initialData }: NewsFormProps) {
  const isEdit = !!initialData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    category: initialData?.category ?? ("소식" as NewsCategory),
    thumbnail: initialData?.thumbnail ?? "",
    source: initialData?.source ?? "",
    date: initialData?.date ?? new Date().toISOString().split("T")[0],
    link: initialData?.link ?? "",
    published: initialData?.published ?? true,
    featured: initialData?.featured ?? false,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (field: string, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", form.title || "news");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-token": getAdminToken() },
        body: formData,
      });

      if (res.ok) {
        const result: UploadResult = await res.json();
        setUploadResult(result);
        setForm((prev) => ({ ...prev, thumbnail: result.path }));
      } else {
        const err = await res.json();
        setError(err.error || "업로드 실패");
      }
      setUploading(false);
    },
    [form.title]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setError("");

      const body = isEdit ? { ...form, id: initialData.id } : form;

      const res = await fetch("/api/admin/news", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getAdminToken(),
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        window.location.href = "/admin/news";
      } else {
        const err = await res.json();
        setError(err.error || "저장 실패");
        setSaving(false);
      }
    },
    [form, isEdit, initialData]
  );

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <a
        href="/admin/news"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        뉴스 목록
      </a>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            제목
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="뉴스 제목"
          />
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              카테고리
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              날짜
            </label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            썸네일
          </label>
          <div className="flex items-start gap-4">
            {/* Preview */}
            <div className="w-[160px] min-w-[160px] aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
              {form.thumbnail ? (
                <Image
                  src={form.thumbnail}
                  alt="미리보기"
                  width={160}
                  height={120}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon size={24} className="text-gray-300" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Upload size={14} />
                {uploading ? "최적화 중..." : "이미지 업로드"}
              </button>
              <p className="text-xs text-gray-400">
                JPG, PNG, WebP (최대 10MB) — 자동으로 WebP 800px로 최적화
              </p>

              {/* Upload Result */}
              {uploadResult && (
                <div className="text-xs bg-green-50 text-green-700 rounded-lg p-3 space-y-1">
                  <p>
                    원본: {uploadResult.original.format?.toUpperCase()}{" "}
                    {uploadResult.original.width}x{uploadResult.original.height}{" "}
                    ({formatBytes(uploadResult.original.size)})
                  </p>
                  <p>
                    최적화: WebP {uploadResult.optimized.width}px (
                    {formatBytes(uploadResult.optimized.size)}) —{" "}
                    <strong>{uploadResult.savings} 절감</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Source + Link */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              출처
            </label>
            <input
              type="text"
              required
              value={form.source}
              onChange={(e) => handleChange("source", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="담하 블로그"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              링크
            </label>
            <input
              type="text"
              required
              value={form.link}
              onChange={(e) => handleChange("link", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Published + Featured */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => handleChange("published", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
            </label>
            <span className="text-sm text-gray-600">발행</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-amber-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
            </label>
            <span className="text-sm text-gray-600">메인 노출</span>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {saving ? "저장 중..." : isEdit ? "수정 저장" : "등록"}
          </button>
          <a
            href="/admin/news"
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            취소
          </a>
        </div>
      </div>
    </form>
  );
}
