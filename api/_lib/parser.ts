import { Request } from 'express';
import { parse } from 'url';
import { ParsedRequest } from './types';
import metascraper from 'metascraper';
import title from 'metascraper-title';
import desc from 'metascraper-description';
import { getPage } from './chromium';
import { supabase } from '../plugins/supabase';

const getDomain = (url: string) => {
	const domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim; //Regex found here - https://regex101.com/r/wN6cZ7/365
	const regexArray = domainRegex.exec(url);
	return regexArray ? regexArray[1] : '';
}

const fetchSettings =async (domain: string) => {
	let { data: Accounts, error } = await supabase
	.from('Accounts')
	.select("*")
	.eq('domain', domain)
	if(error) {
		return {}
	}
	return Accounts;
}

export async function parseURLRequest(req: Request, startSkipWord: string = '') {
	console.log('HTTP ' + req.url, startSkipWord);
	const { query } = parse(req.url || '/', true);
	const { url } = query || {};
	const scraper = metascraper([title(), desc()]);
	const targetUrl = String(url) || '';
	
	const domain = getDomain(String(url));
	const settings = await fetchSettings(domain);
	console.log(settings);
	console.log(domain)
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
