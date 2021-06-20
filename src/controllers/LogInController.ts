import { Request, Response } from 'express';
import { controller, get } from './decorators/index';

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
};

export default LogInController;