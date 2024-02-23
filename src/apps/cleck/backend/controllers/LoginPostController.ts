import { NextFunction, Request, Response } from 'express';

import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { UserRepository } from '../../../../Contexts/Auth/Users/domain/UserRepository';
import { Controller } from './Controller';

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
	private readonly jwtService: JWTService;
	private readonly userRepository: UserRepository;
	constructor(opts: {
		userValidator: UserValidator;
		jwtService: JWTService;
		userRepository: UserRepository;
	}) {
		this.userValidator = opts.userValidator;
		this.jwtService = opts.jwtService;
		this.userRepository = opts.userRepository;
	}

	async run(req: LoginPostRequest, res: Response, next: NextFunction): Promise<void> {
		try {
			const cookies: Cookies = req.cookies;
			const { email, password } = req.body;

			const foundUser = await this.userValidator.run({ email, password });

			const payload = {
				id: foundUser.id.value,
				username: foundUser.username.value,
				email: foundUser.email.value
			};
			const accessToken = this.jwtService.signAccessToken(payload);
			const newRefreshToken = this.jwtService.signRefreshToken(payload);

			if (cookies.refreshToken) {
				const foundUserWithToken = await this.userRepository.searchUserByToken(cookies.refreshToken);
				if (!foundUserWithToken) {
          foundUser.revokeRefreshTokens();
				}
        foundUser.removeRefreshToken(cookies.refreshToken);
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
			}

      foundUser.addRefreshToken(newRefreshToken);
      this.userRepository.save(foundUser);
			res.cookie('refreshToken', newRefreshToken, {
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
