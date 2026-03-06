"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { Lock } from "lucide-react";

const STORAGE_KEY = "damha-admin-token";

let cachedToken = "";

export function getAdminToken() {
  if (cachedToken) return cachedToken;
  if (typeof window !== "undefined") {
    cachedToken = sessionStorage.getItem(STORAGE_KEY) ?? "";
  }
  return cachedToken;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // Check sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      fetch("/api/admin/news", {
        headers: { "x-admin-token": stored },
      }).then((res) => {
        if (res.ok) {
          cachedToken = stored;
          setAuthenticated(true);
        }
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, []);

  const handleLogin = useCallback(async () => {
    setError("");
    const res = await fetch("/api/admin/news", {
      headers: { "x-admin-token": password },
    });
    if (res.ok) {
      cachedToken = password;
      sessionStorage.setItem(STORAGE_KEY, password);
      setAuthenticated(true);
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  }, [password]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400 text-sm">확인 중...</span>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
              <Lock size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 mb-3"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mb-3">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">담하 Admin</h1>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href="/admin/news"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              뉴스 관리
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              사이트로 이동
            </a>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}
