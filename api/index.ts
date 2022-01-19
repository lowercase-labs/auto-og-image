import express from 'express';
import { Request, Response } from 'express';
import url from './url/index';
require('dotenv').config();

const port = Number(process.env.PORT) || 8080;

const app = express();
app.enable('trust proxy');

app.get('/', (_: Request, res: Response) => {
	res.status(200).send('Hello Google App Engine');
});

app.get('/url', url)

app.listen(port, () => {
    console.log('Serve running on', port);
});
