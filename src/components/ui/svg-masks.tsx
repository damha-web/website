/**
 * SVG Mask Definitions
 * ThinkCreative 스타일의 독특한 이미지 마스크 컬렉션
 */

export function SVGMasks() {
    return (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
                {/* Blob Mask 1: Organic Shape */}
                <clipPath id="blobMask1" clipPathUnits="objectBoundingBox">
                    <path d="M0.85,0.45 C0.85,0.25 0.75,0.1 0.55,0.1 C0.35,0.1 0.25,0.25 0.25,0.45 C0.25,0.65 0.15,0.75 0.15,0.85 C0.15,0.95 0.25,1 0.45,1 C0.65,1 0.85,0.95 0.85,0.85 C0.85,0.75 0.85,0.65 0.85,0.45 Z" />
                </clipPath>

                {/* Blob Mask 2: Asymmetric Wave */}
                <clipPath id="blobMask2" clipPathUnits="objectBoundingBox">
                    <path d="M0.1,0.2 C0.15,0.05 0.3,0 0.5,0 C0.7,0 0.85,0.05 0.9,0.2 C0.95,0.35 1,0.5 1,0.7 C1,0.9 0.95,1 0.7,1 C0.45,1 0.2,0.95 0.1,0.8 C0,0.65 0.05,0.35 0.1,0.2 Z" />
                </clipPath>

                {/* Geometric Mask: Pentagon */}
                <clipPath id="pentagonMask" clipPathUnits="objectBoundingBox">
                    <polygon points="0.5,0 1,0.38 0.82,1 0.18,1 0,0.38" />
                </clipPath>

                {/* Squircle (Smooth Square) */}
                <clipPath id="squircleMask" clipPathUnits="objectBoundingBox">
                    <path d="M0,0.5 C0,0.15 0.15,0 0.5,0 C0.85,0 1,0.15 1,0.5 C1,0.85 0.85,1 0.5,1 C0.15,1 0,0.85 0,0.5 Z" />
                </clipPath>

                {/* Arch Top */}
                <clipPath id="archTopMask" clipPathUnits="objectBoundingBox">
                    <path d="M0,0.2 C0,0.09 0.22,0 0.5,0 C0.78,0 1,0.09 1,0.2 L1,1 L0,1 Z" />
                </clipPath>

                {/* Diagonal Slice */}
                <clipPath id="diagonalSliceMask" clipPathUnits="objectBoundingBox">
                    <polygon points="0,0 1,0.15 1,1 0,0.85" />
                </clipPath>
            </defs>
        </svg>
    );
}

export const MASK_IDS = [
    'blobMask1',
    'blobMask2',
    'pentagonMask',
    'squircleMask',
    'archTopMask',
    'diagonalSliceMask'
] as const;

export type MaskId = typeof MASK_IDS[number];
