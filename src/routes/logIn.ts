import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
	body: {[key: string]: string | undefined};
};

function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session?.loggedIn) {
		next();

		return;
	};

	res.status(403).end('FORBIDDEN');
};

const router = Router();

router.get('/login', (req: Request, res: Response) => {
	res.send(`
		<form method='POST'>
			<div>
				<label>Email</label>
				<input name='email' />
			</div>
			<div>
				<label>Password</label>
				<input name='password' type='password' />
			</div>
			<button>Submit</button>
		</form>
	`);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
	const { email, password } = req.body;

	if (email === 'test@test.test' && password === 'test') {
		req.session = {loggedIn: true};

		res.redirect('/');
	} else {
		res.end('INVALID EMAIL OR PASSWORD');
	};
});

router.get('/', (req: Request, res: Response) => {
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
});

router.get('/logout', (req: Request, res: Response) => {
	req.session = undefined;

	res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.end('Welcome, Authenticated User!')
});

export default router;