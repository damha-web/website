"use client";

import React, { useMemo } from "react";
import { Cloud, ICloud } from "react-icon-cloud";
import { ClientLogo } from "@/data/clients";

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
        imageScale: 1, // 2 -> 1로 축소
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.02, // 기존 0.04에서 감소
        minSpeed: 0.01, // 기존 0.02에서 감소
        frontSelect: true,
        weight: true,
    },
};

export type ClientIconCloudProps = {
    logos: ClientLogo[];
};

export function ClientIconCloud({ logos }: ClientIconCloudProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const renderedNodes = useMemo(() => {
        return logos.map((logo) => {
            return (
                <a
                    key={logo.id}
                    href="#"
                    role="presentation"
                    aria-label={logo.name}
                    onClick={(e) => e.preventDefault()}
                    style={{
                        display: "flex", // important for vertically centering within the canvas
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    className="hover:scale-110 transition-transform duration-300"
                >
                    <img
                        src={logo.imagePath}
                        alt={logo.name}
                        width={90}  // 캔버스 엔진이 인식할 수 있도록 명시적 속성 부여
                        height={45}
                        style={{ objectFit: "contain" }}
                    />
                </a>
            );
        });
    }, [logos]);

    if (!mounted) {
        return (
            <div className="relative flex size-full items-center justify-center overflow-hidden w-full min-h-[400px]">
                <div className="w-48 h-48 rounded-full border-2 border-gray-100 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden w-full">
            <Cloud id="client-icon-cloud-canvas" {...cloudProps}>
                <>{renderedNodes}</>
            </Cloud>
        </div>
    );
}
