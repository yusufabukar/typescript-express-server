import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session?.loggedIn) {
		next();

		return;
	};

	res.status(403).end('403 FORBIDDEN');
};

@controller('')
class RootController {
	@get('/')
	getRoot(req: Request, res: Response) {
		if (req.session?.loggedIn) {
			res.send(`
				<div>
					<h2>Logged In</>
					<a href='/logout'>Log Out</a>
				</div>
			`);
		} else {
			res.send(`
				<div>
					<h2>Logged Out</>
					<a href='/login'>Log In</a>
				</div>
			`);
		};
	};

	@get('/protected')
	@use(requireAuth)
	getProtected(req: Request, res: Response) {
		res.end('Welcome, Authenticated User!')
	};
};

export default RootController;