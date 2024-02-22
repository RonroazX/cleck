import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserRepository } from '../../../../Contexts/Auth/Users/domain/UserRepository';
import { Controller } from './Controller';

export class LogoutPostController implements Controller {
	private readonly userRepository: UserRepository;
	constructor(opts: { userRepository: UserRepository }) {
		this.userRepository = opts.userRepository;
	}

	async run(req: Request, res: Response, next: NextFunction): Promise<void> {
		const cookies: { refreshToken: string } = req.cookies;

		if (!cookies.refreshToken) {
			res.sendStatus(httpStatus.NO_CONTENT);

			return;
		}

		const foundUser = await this.userRepository.searchUserByToken(cookies.refreshToken);
		if (!foundUser) {
			res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
			res.sendStatus(httpStatus.NO_CONTENT);

			return;
		}

		foundUser.removeRefreshToken(cookies.refreshToken);
		await this.userRepository.save(foundUser);

		res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
		res.sendStatus(httpStatus.NO_CONTENT);
	}
}
