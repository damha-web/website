"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

/**
 * 다크 배경 위의 비비드한 Shader
 * - 어두운 배경 위에 채도 높은 컬러로 극적인 효과 연출
 */
export function SectionShaderBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0a0a1a] via-[#0f1a3d] to-[#0a0a1a]" />
        );
    }

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* 다크 베이스 */}
            <div className="absolute inset-0 bg-[#060612]" />

            {/* Primary Mesh: 깊고 선명한 블루/퍼플/틸 */}
            <MeshGradient
                className="absolute inset-0 w-full h-full opacity-90"
                colors={["#0a1628", "#1e40af", "#0891b2", "#1e3a5f", "#0f172a"]}
                speed={0.25}
            />
            {/* Secondary Mesh: 브랜드 오렌지 + 블루 포인트 */}
            <MeshGradient
                className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen"
                colors={["#f97316", "#2563EB", "#06b6d4", "#8b5cf6"]}
                speed={0.15}
            />
            {/* 상하 페이드: 위아래 흰색 섹션과 부드럽게 연결 */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
        </div>
    )
}
