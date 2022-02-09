"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../_lib/template");
const crawler_1 = require("../_lib/crawler");
const chromium_1 = require("../_lib/chromium");
async function handler(req, res) {
    try {
        const isHtmlDebug = Number(process.env.OG_HTML_DEBUG) === 1;
        const parsedReq = await crawler_1.scrapeMetaInfo(req, 'url');
        const html = template_1.getHtml(parsedReq);
        if (isHtmlDebug) {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
        }
        const file = await chromium_1.getScreenshot(html, "jpeg");
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${"jpeg"}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    }
    catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
exports.default = handler;
//# sourceMappingURL=index.js.map