import { NextFunction, Request, Response } from 'express';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { Controller } from './Controller';

type LoginPostRequest = Request & {
	body: {
		email: string;
		password: string;
	};
};

export class LoginPostController implements Controller {
	private readonly userValidator: UserValidator;
	constructor(opts: { userValidator: UserValidator }) {
		this.userValidator = opts.userValidator;
	}

	async run(req: LoginPostRequest, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email, password } = req.body;

			const jwtTokens = await this.userValidator.run({ email, password });

			const { accessToken, refreshToken } = jwtTokens;

			res
				.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
				.header('Authorization', accessToken)
				.send({ email });
		} catch (e) {
			next(e);
		}
	}
}
