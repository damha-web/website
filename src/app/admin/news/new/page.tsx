"use client";

import NewsForm from "../_components/NewsForm";

export default function NewNewsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">새 글 작성</h2>
      <NewsForm />
    </div>
  );
}
