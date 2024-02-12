import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';

export class LogoutPostController implements Controller {
	run(req: Request, res: Response, next: NextFunction): void {
		const cookies: { refreshToken: string } = req.cookies;

		if (!cookies.refreshToken) {
			res.sendStatus(httpStatus.NO_CONTENT);

			return;
		}

		res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
		res.json({ message: 'Cookies cleared' });
	}
}
