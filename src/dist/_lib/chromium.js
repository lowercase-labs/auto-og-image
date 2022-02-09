"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScreenshot = exports.getPage = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
let _page;
const getPage = async () => {
    if (_page) {
        return _page;
    }
    const browser = await puppeteer_1.default.launch({
        headless: true,
        timeout: 90000,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    _page = await browser.newPage();
    return _page;
};
exports.getPage = getPage;
const getScreenshot = async (html, type) => {
    const page = await getPage();
    await page.setViewport({ width: 1200, height: 627 });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
};
exports.getScreenshot = getScreenshot;
//# sourceMappingURL=chromium.js.map