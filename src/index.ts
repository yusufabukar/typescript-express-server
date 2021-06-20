import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './routes/logIn';
import './controllers/LogInController';
import AppRouter from './AppRouter';

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieSession({keys: ['key']}));
server.use(router);
server.use(AppRouter.getInstance());

server.listen(3000, () => {
	console.group('Port Information')
		console.log('Listening on Port: 3000');
		console.log('Link: http://localhost:3000');
	console.groupEnd();
});