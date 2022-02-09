"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeMetaInfo = void 0;
const url_1 = require("url");
const metascraper_1 = __importDefault(require("metascraper"));
const metascraper_title_1 = __importDefault(require("metascraper-title"));
const metascraper_description_1 = __importDefault(require("metascraper-description"));
const chromium_1 = require("./chromium");
const scrapeMetaInfo = async (req, startSkipWord = '') => {
    console.log('\x1b[36m%s\x1b[0m', 'HTTP ' + req.url, startSkipWord);
    const { query } = url_1.parse(req.url || '/', true);
    const { url } = query || {};
    const scraper = metascraper_1.default([metascraper_title_1.default(), metascraper_description_1.default()]);
    const targetUrl = String(url) || '';
    const domain = getDomain(String(url));
    const page = await chromium_1.getPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    const html = await page.content();
    const metadata = await scraper({ html, url: targetUrl });
    console.log(metadata);
    let imgTitle = '', imgDesc = '';
    if (metadata) {
        imgTitle = metadata.title ? metadata.title : '';
        imgDesc = metadata.description ? metadata.description : '';
    }
    const parsedRequest = {
        imgDomain: domain,
        imgTitle: decodeURIComponent(imgTitle),
        imgDesc: imgDesc || '',
        templateID: 2,
        color: 'blue',
        textColor: '',
        bgColor: 'black',
    };
    return parsedRequest;
};
exports.scrapeMetaInfo = scrapeMetaInfo;
const getDomain = (url) => {
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim;
    const regexArray = domainRegex.exec(url);
    return regexArray ? regexArray[1] : '';
};
//# sourceMappingURL=crawler.js.map