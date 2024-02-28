import { NextFunction, Request, Response } from 'express';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { UserRepository } from '../../../../Contexts/Auth/Users/domain/UserRepository';
import { Controller } from './Controller';
import { TokenCreator } from '../../../../Contexts/Auth/Tokens/application/TokenCreator';
import { RefreshTokenService } from '../../../../Contexts/Auth/Tokens/application/RefreshTokenService';
import { getClientIp } from 'request-ip';

type LoginPostRequest = Request & {
	body: {
		email: string;
		password: string;
	};
};

type Cookies = {
	refreshToken?: string;
};

export class LoginPostController implements Controller {
	private readonly userValidator: UserValidator;
	private readonly userRepository: UserRepository;
  private readonly refreshTokenService: RefreshTokenService;

	constructor(opts: {
		userValidator: UserValidator;
		userRepository: UserRepository;
    refreshTokenService: RefreshTokenService;
	}) {
		this.userValidator = opts.userValidator;
		this.userRepository = opts.userRepository;
    this.refreshTokenService = opts.refreshTokenService;
	}

	async run(req: LoginPostRequest, res: Response, next: NextFunction): Promise<void> {
		try {
			const cookies: Cookies = req.cookies;
      const userAgent = req.headers['user-agent'] ?? 'tango';
      const ip = getClientIp(req);
			const { email, password } = req.body;
      console.log(ip);

			const foundUser = await this.userValidator.run({ email, password });

			const payload = {
				id: foundUser.id.value,
				username: foundUser.username.value,
				email: foundUser.email.value
			};
			const accessToken = TokenCreator.createJwtAccessToken(payload);
			const newJWTRefreshToken = TokenCreator.createJwtRefreshToken(payload);

			if (cookies.refreshToken) {
				const foundUserWithToken = await this.userRepository.searchUserByToken(
					cookies.refreshToken
				);
				if (!foundUserWithToken) {
          await this.refreshTokenService.revokeTokensByUserId(foundUser.id.value);
				}
        await this.refreshTokenService.revokeTokenByRefreshToken(cookies.refreshToken);
				res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
			}
      const newRefreshToken = TokenCreator.createRefreshToken({
        userId: foundUser.id.value,
        isActive: true,
        jwt: newJWTRefreshToken,
        userAgent: userAgent,
        userIP: '192.168.10.10'
      });
      await this.refreshTokenService.saveRefreshToken(newRefreshToken);
			res.cookie('refreshToken', newJWTRefreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000
			});
			res.json({ accessToken });
		} catch (e) {
			next(e);
		}
	}
}
