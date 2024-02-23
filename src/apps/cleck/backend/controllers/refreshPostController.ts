import { NextFunction, Request, Response } from 'express';

import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { UserRepository } from '../../../../Contexts/Auth/Users/domain/UserRepository';
import { ForbiddenError } from '../../../../Contexts/Shared/infrastructure/Errors/ForbiddenError';
import { UnauthorizedError } from '../../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';
import { Controller } from './Controller';

export class RefreshPostController implements Controller {
	private readonly jwtService: JWTService;
	private readonly userValidatorService: UserValidator;
	private readonly userRepository: UserRepository;
	constructor(opts: {
		jwtService: JWTService;
		userValidator: UserValidator;
		userRepository: UserRepository;
	}) {
		this.jwtService = opts.jwtService;
		this.userValidatorService = opts.userValidator;
		this.userRepository = opts.userRepository;
	}

	async run(req: Request, res: Response, next: NextFunction): Promise<void> {
		const cookies: { refreshToken: string } = req.cookies;

		if (!cookies.refreshToken) {
			next(new UnauthorizedError('No refresh token provided'));

			return;
		}

		const refreshToken = cookies.refreshToken;

		res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });

		const foundUser = await this.userValidatorService.getUserByToken(refreshToken);

		if (!foundUser) {
			try {
				const decoded: { id: string; username: string; email: string } =
					await this.jwtService.verify(refreshToken, 'refreshToken');
				const hackedUser = await this.userValidatorService.getUserByEmail(decoded.email);
				if (hackedUser) {
					hackedUser.revokeRefreshTokens();
					await this.userRepository.save(hackedUser);
				}
				throw new ForbiddenError('Forbidden');
			} catch (error) {
				next(new ForbiddenError('Forbidden'));
			}
		}

		if (foundUser) {
			foundUser.removeRefreshToken(refreshToken);
			try {
				const decoded: { id: string; username: string; email: string } =
					await this.jwtService.verify(refreshToken, 'refreshToken');

				const payload = { id: decoded.id, username: decoded.username, email: decoded.email };
				const accessToken = this.jwtService.signAccessToken(payload);
				const newRefreshToken = this.jwtService.signRefreshToken(payload);
				foundUser.addRefreshToken(newRefreshToken);
				await this.userRepository.save(foundUser);

				res.cookie('refreshToken', newRefreshToken, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					maxAge: 24 * 60 * 60 * 1000
				});
				res.json({ accessToken });
			} catch (error) {
				await this.userRepository.save(foundUser);
				next(new ForbiddenError('Forbidden'));
			}
		}
	}
}
