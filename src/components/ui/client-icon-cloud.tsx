"use client";

import React, { useMemo } from "react";
import { Cloud, ICloud } from "react-icon-cloud";
import { Building2, Plus, ArrowUpRight } from "lucide-react";

export const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.02, // 기존 0.04에서 감소
        minSpeed: 0.01, // 기존 0.02에서 감소
        frontSelect: true,
        textFont: "var(--font-pretendard), sans-serif",
        textColour: "#4b5563", // 진한 회색으로 통일
        weight: true,
    },
};

export type ClientIconCloudProps = {
    clients: string[];
};

export function ClientIconCloud({ clients }: ClientIconCloudProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const renderedNodes = useMemo(() => {
        return clients.map((client, index) => {
            // Alternating icons for variety
            const Icon = index % 3 === 0 ? Plus : index % 3 === 1 ? Building2 : ArrowUpRight;

            return (
                <a
                    key={index}
                    href="#"
                    role="presentation"
                    aria-label={client}
                    onClick={(e) => e.preventDefault()}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(0,0,0,0.05)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(0,0,0,0.1)",
                        color: "#4b5563",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textDecoration: "none",
                        cursor: "default",
                    }}
                    className="hover:scale-110 hover:border-primary hover:text-primary transition-all duration-300"
                >
                    <Icon size={18} color="currentColor" aria-hidden="true" />
                    <span>{client}</span>
                </a>
            );
        });
    }, [clients]);

    if (!mounted) {
        return <div className="relative flex size-full items-center justify-center overflow-hidden w-full min-h-[400px]"></div>;
    }

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden w-full">
            <Cloud id="client-icon-cloud-canvas" {...cloudProps}>
                <>{renderedNodes}</>
            </Cloud>
        </div>
    );
}
