import sharp from "sharp";
import { mkdirSync } from "fs";

// Ensure output directories exist
mkdirSync("public/assets/images/portfolio", { recursive: true });
mkdirSync("public/assets/images/cms", { recursive: true });

// Source image size: 3840 x 2160

// ─── Portfolio thumbnails ───
// Left side PC+Mobile mockup area on each page
const PORTFOLIO_CROP = {
    left: 50,
    top: 250,
    width: 1800,
    height: 1600,
};

const portfolioMap = [
    { page: 22, name: "dadaejeong" },
    { page: 23, name: "wooyoungha" },
    { page: 24, name: "dangdang-ss" },
    { page: 25, name: "pingent" },
    { page: 26, name: "solid-derma" },
    { page: 27, name: "gowoonbim" },
    { page: 28, name: "hadanwomen" },
    { page: 29, name: "ssgmedi" },
    { page: 30, name: "kybos" },
    { page: 31, name: "dangdang-cw" },
    { page: 32, name: "pureunskin" },
    { page: 33, name: "minamhospital" },
    { page: 34, name: "qhosp" },
    { page: 35, name: "geo-in" },
    { page: 36, name: "dangdang-ys" },
];

// ─── CMS screenshots ───
// Central CMS UI area (sidebar + main content, excluding right description)
const CMS_CROP = {
    left: 80,
    top: 180,
    width: 2600,
    height: 1850,
};

const cmsMap = [
    { page: 9, name: "site-settings" },
    { page: 10, name: "schedule" },
    { page: 11, name: "doctors" },
    { page: 12, name: "popup" },
    { page: 13, name: "quick-menu" },
    { page: 14, name: "main-slide" },
    { page: 15, name: "tour" },
    { page: 16, name: "equipment" },
    { page: 17, name: "consultation" },
    { page: 18, name: "board" },
    { page: 19, name: "monthly-schedule" },
];

// basic-info shares page_09 but lower portion
const CMS_BASIC_INFO_CROP = {
    left: 400,
    top: 650,
    width: 2200,
    height: 1400,
};

async function processPortfolio() {
    console.log("── Portfolio thumbnails ──");
    for (const item of portfolioMap) {
        const src = `docs/pdf_pages/page_${String(item.page).padStart(2, "0")}.png`;
        const dest = `public/assets/images/portfolio/${item.name}.jpg`;
        try {
            await sharp(src)
                .extract(PORTFOLIO_CROP)
                .resize(800, 500, { fit: "cover", position: "center" })
                .jpeg({ quality: 85 })
                .toFile(dest);
            console.log(`  ✓ ${item.name}.jpg (page_${item.page})`);
        } catch (err) {
            console.error(`  ✗ ${item.name}: ${err.message}`);
        }
    }
}

async function processCMS() {
    console.log("\n── CMS screenshots ──");
    for (const item of cmsMap) {
        const src = `docs/pdf_pages/page_${String(item.page).padStart(2, "0")}.png`;
        const dest = `public/assets/images/cms/${item.name}.png`;
        try {
            await sharp(src)
                .extract(CMS_CROP)
                .resize(1200, 854, { fit: "cover", position: "center" })
                .png({ compressionLevel: 9 })
                .toFile(dest);
            console.log(`  ✓ ${item.name}.png (page_${item.page})`);
        } catch (err) {
            console.error(`  ✗ ${item.name}: ${err.message}`);
        }
    }

    // basic-info (different crop from same page_09)
    try {
        await sharp("docs/pdf_pages/page_09.png")
            .extract(CMS_BASIC_INFO_CROP)
            .resize(1200, 764, { fit: "cover", position: "center" })
            .png({ compressionLevel: 9 })
            .toFile("public/assets/images/cms/basic-info.png");
        console.log("  ✓ basic-info.png (page_09 lower)");
    } catch (err) {
        console.error(`  ✗ basic-info: ${err.message}`);
    }
}

async function main() {
    console.log("Image cropping started...\n");
    await processPortfolio();
    await processCMS();
    console.log("\nDone!");
}

main();
