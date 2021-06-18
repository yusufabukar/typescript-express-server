import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './routes/logIn';

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieSession({keys: ['key']}));

// server.get('/', (req: Request, res: Response) => {
// 	res.end('<h1>Server</h1>');
// });

server.use(router);

server.listen(3000, () => {
	console.group('Port Information')
		console.log('Listening on Port: 3000');
		console.log('Link: http://localhost:3000');
	console.groupEnd();
});