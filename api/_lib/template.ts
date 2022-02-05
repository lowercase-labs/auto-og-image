import { readFileSync } from 'fs';
// import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../public/_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../public/_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../public/_fonts/Vera-Mono.woff2`).toString('base64');
const tailwindcss = readFileSync(`${__dirname}/../public/css/style.css`).toString();

const getCss = () => {
	let foreground = 'black';
	return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
    }
    
    body {
        background-color: #fff;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .text-container {
        text-align: left;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        color: ${foreground};
        line-height: 1.8;
    }
    .sub-heading {
        font-family: 'Inter', sans-serif;
        font-weight: normal;
        color: ${foreground};
    }
    ${tailwindcss}
    `;
}
const getHtmlTemplate = (imgDomain: string, imgTitle:string, imgDesc:string, templateID: number, color: string) => {
    let htmlString;
    switch(templateID) {
        case 1:
            htmlString = `
            <body class="border-t-8 border-${color}-600">
                <div class="container w-100">
                    <div class="spacer">
                        <div class="text-container text-left space-y-4">
                            <h3 class="text-xl text-${color}-900">${imgDomain}</h3>
                            <h2 class="sub-heading text-3xl">${imgDesc}</h2>
                        </div>
                    </div>
                </div>
            </body>
            `;
            break;
        case 2:
            htmlString = `
            <body class="border-t-8 border-${color}-600">
                <div class="container w-100">
                    <div class="spacer">
                        <div class="text-container text-left space-y-4">
                            <h3 class="text-xl text-${color}-900">${imgDomain}</h3>
                            <h1 class="font-bold text-5xl text-${color}-600">${imgTitle}</h1> 
                            <h2 class="sub-heading text-3xl">${imgDesc}</h2>
                        </div>
                    </div>
                </div>
            </body>
            `;
            break;
        default:
            htmlString = `
            <body class="border-t-8 border-${color}-600">
                <div class="container w-100">
                    <div class="spacer">
                        <div class="text-container text-left space-y-4">
                            <h3 class="text-xl text-${color}-900">${imgDomain}</h3>
                            <h1 class="font-bold text-5xl text-${color}-600">${imgTitle}</h1> 
                            <h2 class="sub-heading text-3xl">${imgDesc}</h2>
                        </div>
                    </div>
                </div>
            </body>
            `;
    }
    return htmlString;
}
export function getHtml(parsedReq: ParsedRequest) {
	const { imgDomain, imgTitle, imgDesc, templateID, color } = parsedReq;
	return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Generated Image</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <style>
                ${getCss()}
            </style>
            ${getHtmlTemplate(imgDomain, imgTitle, imgDesc, templateID, color)}
        </html>`;
}
