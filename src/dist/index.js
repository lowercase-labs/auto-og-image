"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./api/index"));
require('dotenv').config();
const port = Number(process.env.PORT) || 8080;
const app = express_1.default();
app.enable('trust proxy');
app.get('/', index_1.default);
app.listen(port, () => {
    console.log('Serve running on', port);
});
//# sourceMappingURL=index.js.map