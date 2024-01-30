import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

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

			const accessToken = await this.userValidator.run({ email, password });

			res.status(httpStatus.OK).send({
				access_token: accessToken
			});
		} catch (e) {
      next(e);
		}
	}
}
