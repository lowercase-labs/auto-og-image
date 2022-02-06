import { Request, Response } from 'express';
import { getHtml } from '../_lib/template';
import { getScreenshot, parseURLRequest } from '../_lib/utils';

export default async function handler(req: Request, res: Response) {
	try {
		// Deploy
		const isHtmlDebug = Number(process.env.OG_HTML_DEBUG) === 1;
		const parsedReq = await parseURLRequest(req, 'url');
		const html = getHtml(parsedReq);
		if (isHtmlDebug) {
			res.setHeader('Content-Type', 'text/html');
			res.end(html);
			return;
		}
		const { fileType } = parsedReq;
		const file = await getScreenshot(html, fileType);
		res.statusCode = 200;
		res.setHeader('Content-Type', `image/${fileType}`);
		res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
		res.end(file);
	
	} catch (e) {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'text/html');
		res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
		console.error(e);
	}
}
