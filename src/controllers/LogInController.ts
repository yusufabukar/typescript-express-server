import { Request, Response } from 'express';
import { bodyValidator, controller, get, post } from './decorators/index';

@controller('/auth')
class LogInController {
	@get('/login')
	getLogIn(req: Request, res: Response): void {
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
	};

	@post('/login')
	@bodyValidator('email', 'password')
	postLogIn(req: Request, res: Response) {
		const { email, password } = req.body;
	
		if (email === 'test@test.test' && password === 'test') {
			req.session = {loggedIn: true};
	
			res.redirect('/');
		} else {
			res.end('INVALID EMAIL OR PASSWORD');
		};
	};

	@get('/logout')
	getLogOut(req: Request, res: Response) {
		req.session = undefined;
	
		res.redirect('/');
	};
};

export default LogInController;