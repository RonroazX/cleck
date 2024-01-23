import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';

type LoginPostRequest = Request & {
	body: {
		email: string;
		password: string;
	};
};

export class LoginPostController implements Controller {
	async run(req: LoginPostRequest, res: Response): Promise<void> {
		res.status(httpStatus.OK).send();
	}
}
