import puppeteer from 'puppeteer';
import { FileType } from './types';
let _page: puppeteer.Page | null;
import { Request } from 'express';
import { parse } from 'url';
import { ParsedRequest } from './types';
import metascraper from 'metascraper';
import title from 'metascraper-title';
import desc from 'metascraper-description';

const getPage = async () => {
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

const getScreenshot = async (html: string, type: FileType) => {
	const page = await getPage();
	await page.setViewport({ width: 1200, height: 627 });
	await page.setContent(html);
	const file = await page.screenshot({ type });
	return file;
}
const getDomain = (url: string) => {
	const domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim; //Regex found here - https://regex101.com/r/wN6cZ7/365
	const regexArray = domainRegex.exec(url);
	return regexArray ? regexArray[1] : '';
}

const parseURLRequest = async (req: Request, startSkipWord: string = '') => {
	console.log('\x1b[36m%s\x1b[0m', 'HTTP ' + req.url, startSkipWord);
	console.log('\x1b[33m%s\x1b[0m', 'HTTP ' + req.url, startSkipWord);
	const { query } = parse(req.url || '/', true);
	const { url } = query || {};
	const scraper = metascraper([title(), desc()]);
	const targetUrl = String(url) || '';
	
	const domain = getDomain(String(url));
	const page = await getPage();
	await page.goto(targetUrl, { waitUntil: 'networkidle2' });
	const html = await page.content();
	const metadata = await scraper({ html, url: targetUrl });
	console.log(metadata);

	let extension = '',
		imgTitle = '',
		imgDesc = '';
	if (metadata) {
		imgTitle = metadata.title ? metadata.title : '';
		imgDesc = metadata.description ? metadata.description : '';
	}

	const parsedRequest: ParsedRequest = {
		imgDomain : domain,
		fileType: extension === 'jpeg' ? extension : 'png',
		imgTitle: decodeURIComponent(imgTitle),
		imgDesc: imgDesc || '',
		templateID: 2,
		color: 'blue',
		textColor: '',
		bgColor: 'black',
	};
	return parsedRequest;
}

export { getPage, getScreenshot, parseURLRequest, getDomain };
