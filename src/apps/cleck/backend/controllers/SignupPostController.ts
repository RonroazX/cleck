import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserCreator } from '../../../../Contexts/Auth/Users/application/UserCreator';
import { Controller } from './Controller';
import { UserCreatorRequest } from '../../../../Contexts/Auth/Users/application/UserCreatorRequest';

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

	async run(req: SignupPostRequest, res: Response): Promise<void> {
		try {
			const { username, email, password }: UserCreatorRequest = req.body;

			await this.userCreator.run({ username, email, password });

			res.status(httpStatus.CREATED).send();
		} catch (e) {
			console.log(e);
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
		}
	}
}
