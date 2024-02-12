import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserCreator } from '../../../../Contexts/Auth/Users/application/UserCreator';
import { UserCreatorRequest } from '../../../../Contexts/Auth/Users/application/UserCreatorRequest';
import { Controller } from './Controller';

type SignupPostRequest = Request & {
	body: {
		username: string;
		email: string;
		password: string;
	};
};

export class SignupPostController implements Controller {
	private readonly userCreator: UserCreator;

	constructor(opts: { userCreator: UserCreator }) {
		this.userCreator = opts.userCreator;
	}

	async run(req: SignupPostRequest, res: Response, next: NextFunction): Promise<void> {
		try {
			const { username, email, password }: UserCreatorRequest = req.body;

			await this.userCreator.run({ username, email, password });

			res.status(httpStatus.CREATED).send();
		} catch (e) {
			next(e);
		}
	}
}
