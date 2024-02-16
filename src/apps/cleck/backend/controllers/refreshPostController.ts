import { NextFunction, Request, Response } from 'express';

import { JWTService, jwtUserPayload } from '../../../../Contexts/Auth/Users/application/JwtService';
import { UnauthorizedError } from '../../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';
import container from '../dependency-injection/configureContainer';
import { Controller } from './Controller';

export class RefreshPostController implements Controller {
	private readonly jwtService: JWTService;
	constructor(opts: { jwtService: JWTService }) {
		this.jwtService = opts.jwtService;
	}

	async run(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const jwtService = container.resolve<JWTService>('jwtService');
			const cookies: { refreshToken: string } = req.cookies;

			if (!cookies.refreshToken) {
				throw new UnauthorizedError('No refresh token provided');
			}

      		res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });

			const decoded: jwtUserPayload = await jwtService.verifyRefreshToken(cookies.refreshToken);

			const payload = { id: decoded.id, username: decoded.username, email: decoded.email };

			const accessToken = this.jwtService.signAccessToken(payload);

			res.json({ accessToken });
		} catch (e) {
			next(e);
		}
	}
}
