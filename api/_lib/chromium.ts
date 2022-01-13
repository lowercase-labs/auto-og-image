import puppeteer from 'puppeteer';
import { FileType } from './types';
let _page: puppeteer.Page | null;

export async function getPage() {
	if (_page) {
		return _page;
	}
	const browser = await puppeteer.launch({
		headless: true,
		timeout: 90000,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	_page = await browser.newPage();
	return _page;
}

export async function getScreenshot(html: string, type: FileType) {
	const page = await getPage();
	// await page.setViewport({ width: 2048, height: 1170 });
	await page.setViewport({ width: 1200, height: 627 });
	await page.setContent(html);
	const file = await page.screenshot({ type });
	return file;
}
