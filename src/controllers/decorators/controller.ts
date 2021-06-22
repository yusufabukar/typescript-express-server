import { Request, Response, NextFunction, RequestHandler } from 'express';
import 'reflect-metadata';
import AppRouter from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';

function bodyValidators(keys: string): RequestHandler {
	return function(req: Request, res: Response, next: NextFunction) {
		if (!req.body) {
			res.status(422).end('422 UNPROCESSABLE ENTITY');

			return;
		};

		for (let key of keys) {
			if (!req.body[key]) {
				res.status(422).end('422 UNPROCESSABLE ENTITY');

				return;
			};
		};

		next();
	};
};

export function controller(routePrefix: string) {
	return function(target: Function) {
		const router = AppRouter.getInstance();

		for (let key in target.prototype) {
			const routeHandler = target.prototype[key];

			const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
			const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);
			const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
			const requiredBodyProps = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];

			const validator = bodyValidators(requiredBodyProps);

			if (path) {
				router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
			};
		};
	};
};