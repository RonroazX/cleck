import { NextFunction, Response } from 'express';

import { RefreshTokenService } from '../../../../Contexts/UserManagement/Tokens/application/RefreshTokenService';
import { TokenCreator } from '../../../../Contexts/UserManagement/Tokens/application/TokenCreator';
import { UserValidator } from '../../../../Contexts/UserManagement/Users/application/UserUserManagement';
import { ForbiddenError } from '../../../../Contexts/Shared/infrastructure/Errors/ForbiddenError';
import { Controller } from './Controller';
import { IAuthRequest } from '../middlewares/authMiddlewares';

export class LoginPostController implements Controller {
	private readonly userValidator: UserValidator;
	private readonly refreshTokenService: RefreshTokenService;

	constructor(opts: { userValidator: UserValidator; refreshTokenService: RefreshTokenService }) {
		this.userValidator = opts.userValidator;
		this.refreshTokenService = opts.refreshTokenService;
	}

	async run(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email, password } = req.body;

			const foundUser = await this.userValidator.run({ email, password });

			const payload = {
				id: foundUser.id.value,
				username: foundUser.username.value,
				email: foundUser.email.value
			};
			const accessToken = TokenCreator.createJwtAccessToken(payload);
			const newJWTRefreshToken = TokenCreator.createJwtRefreshToken(payload);

			if (cookies.refreshToken) {
				const foundToken = await this.refreshTokenService.searchTokenByRefreshToken(
					cookies.refreshToken
				);
				if (!foundToken) {
					await this.refreshTokenService.revokeTokensByUserId(foundUser.id.value);
				}
				res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
			}
			res.cookie('refreshToken', newJWTRefreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000
			});

			if (clientId) {
				const foundTokenWithClientId =
					await this.refreshTokenService.searchTokenByClientId(clientId);
				if (!foundTokenWithClientId) {
					next(new ForbiddenError('Forbidden'));

					return;
				}
				await this.refreshTokenService.updateToken(
					foundTokenWithClientId.clientId.value,
					newJWTRefreshToken,
					new Date(Date.now())
				);
				res.json({ accessToken, clientId: foundTokenWithClientId.clientId.value });
			} else {
				const newRefreshToken = TokenCreator.createRefreshToken({
					userId: foundUser.id.value,
					isActive: true,
					jwt: newJWTRefreshToken,
					userAgent,
					userIP: '192.168.10.10'
				});
				await this.refreshTokenService.saveRefreshToken(newRefreshToken);
				res.json({ accessToken, clientId: newRefreshToken.clientId.value });
			}
		} catch (e) {
			next(e);
		}
	}
}
