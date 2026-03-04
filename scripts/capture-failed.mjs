import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertToUrl(domain, protocol = 'https') {
    try {
        const url = new URL(domain.startsWith('http') ? domain : `${protocol}://${domain}`);
        return url.href;
    } catch (e) {
        return `${protocol}://${domain}`;
    }
}

// 미캡처 5개 사이트
const FAILED_SITES = [
    { id: "dangdang-ss", url: "yesdang-ss.co.kr" },
    { id: "dangdang-cw", url: "yesdang-cw.com" },
    { id: "dangdang-ys", url: "yesdang-ys.com" },
    { id: "minamhospital", url: "minamhospital.com" },
    { id: "kybos", url: "kybos.co.kr" },
];

const OUTPUT_DIR = path.resolve(__dirname, '../public/assets/images/portfolio/detail');

async function tryCapture(context, url, outputPath, label) {
    const page = await context.newPage();
    try {
        console.log(`  - ${label} 접속 중... (${url})`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        // DOM 로드 후 이미지/폰트 등 리소스 로딩 대기
        await page.waitForTimeout(5000);
        await page.screenshot({ path: outputPath, fullPage: false, type: 'jpeg', quality: 90 });
        console.log(`  OK ${label} 캡처 완료: ${path.basename(outputPath)}`);
        return true;
    } catch (error) {
        console.log(`  FAIL ${label}: ${error.message.split('\n')[0]}`);
        return false;
    } finally {
        await page.close();
    }
}

async function captureWithFallback(pcContext, mobileContext, item) {
    console.log(`\n[${item.id}] 캡처 시작...`);

    const pcPath = path.join(OUTPUT_DIR, `${item.id}-pc.jpg`);
    const mobilePath = path.join(OUTPUT_DIR, `${item.id}-mobile.jpg`);

    // 시도 순서: HTTPS → HTTP
    const protocols = ['https', 'http'];
    let pcDone = false;
    let mobileDone = false;

    for (const protocol of protocols) {
        const targetUrl = convertToUrl(item.url, protocol);

        if (!pcDone) {
            pcDone = await tryCapture(pcContext, targetUrl, pcPath, `PC(${protocol})`);
        }
        if (!mobileDone) {
            mobileDone = await tryCapture(mobileContext, targetUrl, mobilePath, `Mobile(${protocol})`);
        }

        if (pcDone && mobileDone) break;
    }

    return { id: item.id, pc: pcDone, mobile: mobileDone };
}

async function main() {
    console.log('미캡처 포트폴리오 5개 재시도...\n');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const browser = await chromium.launch({ headless: true });

    // ignoreHTTPSErrors: true로 SSL 오류 우회
    const pcContext = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        ignoreHTTPSErrors: true,
    });

    const mobileContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true,
        ignoreHTTPSErrors: true,
    });

    const results = [];
    for (const item of FAILED_SITES) {
        const result = await captureWithFallback(pcContext, mobileContext, item);
        results.push(result);
    }

    await browser.close();

    console.log('\n=== 결과 요약 ===');
    for (const r of results) {
        const status = r.pc && r.mobile ? 'OK' : 'PARTIAL/FAIL';
        console.log(`[${r.id}] ${status} (PC: ${r.pc ? 'O' : 'X'}, Mobile: ${r.mobile ? 'O' : 'X'})`);
    }
}

main().catch(console.error);
