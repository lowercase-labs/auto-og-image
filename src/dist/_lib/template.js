"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtml = void 0;
const fs_1 = require("fs");
const tailwindcss = fs_1.readFileSync(`${__dirname}/../public/css/style.css`).toString();
const getCss = () => {
    return `
    <style>
        body {
            background-color: #fff;
            height: 100vh;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        ${tailwindcss}
    </style>
    `;
};
const getBody = (imgDomain, imgTitle, imgDesc, templateID, color) => {
    let htmlString;
    switch (templateID) {
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
};
function getHtml(parsedReq) {
    const { imgDomain, imgTitle, imgDesc, templateID, color } = parsedReq;
    return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Generated Image</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            ${getCss()}
            ${getBody(imgDomain, imgTitle, imgDesc, templateID, color)}
        </html>`;
}
exports.getHtml = getHtml;
//# sourceMappingURL=template.js.map