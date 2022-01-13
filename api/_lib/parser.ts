import { Request } from 'express';
import { parse } from 'url';
import { ParsedRequest } from './types';
import metascraper from 'metascraper';
import desc from 'metascraper-description';
import title from 'metascraper-title';
import { getPage } from './chromium';

export function parseRequest(req: Request) {
	console.log('HTTP ' + req.url);
	const { pathname, query } = parse(req.url || '/', true);
	const { fontSize, logo, courseName, textColor, bgColor } = query || {};

	if (Array.isArray(fontSize)) {
		throw new Error('Expected a single fontSize');
	}
	if (Array.isArray(logo)) {
		throw new Error('Expected a single Logo');
	}
	if (Array.isArray(courseName)) {
		throw new Error('Expected a single CourseName');
	}
	let textColorTemp: string | undefined = '';
	let bgColorTemp: string | undefined = '';
	if (!textColor) {
		textColorTemp = textColor;
	}
	if (!bgColor) {
		bgColorTemp = bgColor;
	}

	let arr = (pathname || '/').slice(1).split('.');
	console.log(arr);

	arr[0] = arr[0].split('/')[1];
	let extension = '';
	let academyName = '';
	if (arr.length === 0) {
		academyName = '';
	} else if (arr.length === 1) {
		academyName = arr[0];
	} else {
		extension = arr.pop() as string;
		academyName = arr.join('.');
	}

	const parsedRequest: ParsedRequest = {
		fileType: extension === 'jpeg' ? extension : 'png',
		academyName: decodeURIComponent(academyName),
		fontSize: fontSize || '96px',
		logo: logo || '',
		courseName: courseName,
		textColor: textColorTemp,
		bgColor: bgColorTemp,
	};
	return parsedRequest;
}

export async function parseURLRequest(req: Request, startSkipWord: string = '') {
	console.log('HTTP ' + req.url, startSkipWord);
	const { query } = parse(req.url || '/', true);
	const { url } = query || {};
	const scraper = metascraper([desc(), title()]);
	const targetUrl = String(url) || '';
	const page = await getPage();
	await page.goto(targetUrl, { waitUntil: 'networkidle2' });
	const html = await page.content();

	const metadata = await scraper({ html, url: targetUrl });
	console.log(metadata);

	let extension = '';
	let academyName = '';
	let courseName = '';
	if (metadata && metadata.title) {
		academyName = metadata.title;
	} else {
		academyName = '';
	}
	if (metadata && metadata.description) {
		courseName = metadata.description;
	} else {
		courseName = '';
	}

	const parsedRequest: ParsedRequest = {
		fileType: extension === 'jpeg' ? extension : 'png',
		academyName: decodeURIComponent(academyName),
		fontSize: '16px',
		logo: '',
		courseName: courseName || '',
		textColor: '',
		bgColor: '',
	};
	return parsedRequest;
}
