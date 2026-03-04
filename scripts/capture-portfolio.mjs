import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 한글 도메인을 퓨니코드로 변환하기 위한 유틸리티
function convertToUrl(domain) {
    try {
        const url = new URL(domain.startsWith('http') ? domain : `https://${domain}`);
        return url.href;
    } catch (e) {
        return `https://${domain}`;
    }
}

const PORTFOLIO_DATA = [
    { id: "dadaejeong", url: "다대정내과.com" },
    { id: "wooyoungha", url: "우영하척정형외과.com" },
    { id: "dangdang-ss", url: "yesdang-ss.co.kr" },
    { id: "pingent", url: "pingent.co.kr" },
    { id: "solid-derma", url: "solid-derma.com" },
    { id: "gowoonbim", url: "gowoonbim.com" },
    { id: "hadanwomen", url: "hadanwomenclinic.com" },
    { id: "ssgmedi", url: "ssgmedi.co.kr" },
    { id: "kybos", url: "kybos.co.kr" },
    { id: "dangdang-cw", url: "yesdang-cw.com" },
    { id: "pureunskin", url: "pureunskin.com" },
    { id: "minamhospital", url: "minamhospital.com" },
    { id: "qhosp", url: "qhosp.co.kr" },
    { id: "geo-in", url: "geo-in.co.kr" },
    { id: "dangdang-ys", url: "yesdang-ys.com" }
];

const OUTPUT_DIR = path.resolve(__dirname, '../public/assets/images/portfolio/detail');

async function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

async function captureScreenshots() {
    console.log('포트폴리오 상세 화면 캡처 시작...');
    await ensureDir(OUTPUT_DIR);

    const browser = await chromium.launch({ headless: true });

    // PC Context
    const pcContext = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        ignoreHTTPSErrors: true,
    });

    // Mobile Context (iPhone 13 size approx)
    const mobileContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true,
        ignoreHTTPSErrors: true,
    });

    for (const item of PORTFOLIO_DATA) {
        const targetUrl = convertToUrl(item.url);
        console.log(`\n[${item.id}] 캡처 진행 중... (${targetUrl})`);

        try {
            // PC 캡처
            const pcPage = await pcContext.newPage();
            console.log(`  - PC 화면 접속 중...`);
            await pcPage.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });

            // 페이지 리소스 로딩 대기
            await pcPage.waitForTimeout(5000);

            const pcPath = path.join(OUTPUT_DIR, `${item.id}-pc.jpg`);
            await pcPage.screenshot({ path: pcPath, fullPage: false, type: 'jpeg', quality: 90 });
            console.log(`  ✅ PC 캡처 완료`);
            await pcPage.close();

            // Mobile 캡처
            const mobilePage = await mobileContext.newPage();
            console.log(`  - Mobile 화면 접속 중...`);
            await mobilePage.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });

            // 페이지 애니메이션 로딩 대기
            await mobilePage.waitForTimeout(2000);

            const mobilePath = path.join(OUTPUT_DIR, `${item.id}-mobile.jpg`);
            await mobilePage.screenshot({ path: mobilePath, fullPage: false, type: 'jpeg', quality: 90 });
            console.log(`  ✅ Mobile 캡처 완료`);
            await mobilePage.close();

        } catch (error) {
            console.error(`  ❌ [${item.id}] 캡처 실패:`, error.message);
        }
    }

    await browser.close();
    console.log('\n모든 캡처가 완료되었습니다!');
}

captureScreenshots().catch(console.error);
