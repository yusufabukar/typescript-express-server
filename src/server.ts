import express from 'express';
import AppRouter from './AppRouter';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/RootController';
import './controllers/LogInController';

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieSession({keys: ['key']}));
server.use(AppRouter.getInstance());

server.listen(3000, () => {
	console.group('Port Information')
		console.log('Listening on Port: 3000');
		console.log('Link: http://localhost:3000');
	console.groupEnd();
});