import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { RefreshTokenService } from '../../../../Contexts/UserManagement/Tokens/application/RefreshTokenService';
import { Controller } from './Controller';

export class LogoutPostController implements Controller {
	private readonly refreshTokenService: RefreshTokenService;
	constructor(opts: { refreshTokenService: RefreshTokenService }) {
		this.refreshTokenService = opts.refreshTokenService;
	}

	async run(req: Request, res: Response, next: NextFunction): Promise<void> {
		const cookies: { refreshToken: string } = req.cookies;

		if (!cookies.refreshToken) {
			res.sendStatus(httpStatus.NO_CONTENT);

			return;
		}

		const foundToken = await this.refreshTokenService.searchTokenByRefreshToken(
			cookies.refreshToken
		);
		if (!foundToken) {
			res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
			res.sendStatus(httpStatus.NO_CONTENT);

			return;
		}
		await this.refreshTokenService.revokeTokenByRefreshToken(cookies.refreshToken);

		res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
		res.sendStatus(httpStatus.NO_CONTENT);
	}
}
