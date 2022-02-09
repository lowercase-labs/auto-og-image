import express from 'express';
import api from './api/index';
require('dotenv').config();

const port = Number(process.env.PORT) || 8080;

const app = express();
app.enable('trust proxy');

app.get('/', api);

app.listen(port, () => {
	console.log('Serve running on', port);
});
