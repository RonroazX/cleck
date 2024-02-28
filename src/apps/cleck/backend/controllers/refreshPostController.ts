import { NextFunction, Request, Response } from 'express';

import { RefreshTokenService } from '../../../../Contexts/Auth/Tokens/application/RefreshTokenService';
import { TokenCreator } from '../../../../Contexts/Auth/Tokens/application/TokenCreator';
import { TokenValidator } from '../../../../Contexts/Auth/Tokens/application/TokenValidator';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { ForbiddenError } from '../../../../Contexts/Shared/infrastructure/Errors/ForbiddenError';
import { UnauthorizedError } from '../../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';
import { Controller } from './Controller';

export class RefreshPostController implements Controller {
	private readonly refreshTokenService: RefreshTokenService;
	private readonly userValidatorService: UserValidator;
	constructor(opts: { refreshTokenService: RefreshTokenService; userValidator: UserValidator }) {
		this.refreshTokenService = opts.refreshTokenService;
		this.userValidatorService = opts.userValidator;
	}

	async run(req: Request, res: Response, next: NextFunction): Promise<void> {
		const cookies: { refreshToken: string } = req.cookies;
		const userAgent = req.headers['user-agent'] ?? 'tango';
		//const ip = req.ip ?? '';

		if (!cookies.refreshToken) {
			next(new UnauthorizedError('No refresh token provided'));

			return;
		}

		const refreshToken = cookies.refreshToken;

		res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });

		const foundToken = await this.refreshTokenService.searchTokenByRefreshToken(refreshToken);

		if (!foundToken) {
			try {
				const decoded: { id: string; username: string; email: string } = TokenValidator.verify(
					refreshToken,
					'refreshToken'
				);
				const hackedUser = await this.userValidatorService.getUserByEmail(decoded.email);
				if (hackedUser) {
					await this.refreshTokenService.revokeTokensByUserId(hackedUser.id.value);
				}
				throw new ForbiddenError('Forbidden');
			} catch (error) {
				next(new ForbiddenError('Forbidden'));
			}
		}

		if (foundToken) {
			await this.refreshTokenService.revokeTokenByRefreshToken(refreshToken);
			try {
				const decoded: { id: string; username: string; email: string } = TokenValidator.verify(
					refreshToken,
					'refreshToken'
				);
				const payload = { id: decoded.id, username: decoded.username, email: decoded.email };
				const accessToken = TokenCreator.createJwtAccessToken(payload);
				const newJWTRefreshToken = TokenCreator.createJwtRefreshToken(payload);
				const newRefreshToken = TokenCreator.createRefreshToken({
					userId: decoded.id,
					isActive: true,
					jwt: newJWTRefreshToken,
					userAgent,
					userIP: '192.168.1.1' //todo: cambiar por la variable ip
				});
				await this.refreshTokenService.saveRefreshToken(newRefreshToken);
				res.cookie('refreshToken', newJWTRefreshToken, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					maxAge: 24 * 60 * 60 * 1000
				});
				res.json({ accessToken });
			} catch (error) {
				console.log(error);
				await this.refreshTokenService.saveRefreshToken(foundToken);
				next(new ForbiddenError('Forbidden'));
			}
		}
	}
}
