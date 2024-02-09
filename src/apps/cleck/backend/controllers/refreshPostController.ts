import { NextFunction, Response } from 'express';

import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';
import { UserRequest } from '../middlewares/authMiddleware';
import { Controller } from './Controller';
import { UnauthorizedError } from '../../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';
import container from '../dependency-injection/configureContainer';

export class RefreshPostController implements Controller {
	private readonly jwtService: JWTService;
	constructor(opts: { jwtService: JWTService }) {
		this.jwtService = opts.jwtService;
	}

	async run(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
		try {
      const jwtService = container.resolve<JWTService>('jwtService');
	    const refreshToken = req.cookies;

      if (!refreshToken) {
        throw new UnauthorizedError('No refresh token provided');
      }

	    const decoded = await jwtService.verify(refreshToken);

			const payload = { id: decoded.id, username: decoded.username, email: decoded.email };

			const accessToken = this.jwtService.signAccessToken(payload);

			res.header('Authorization', accessToken).send(decoded);
		} catch (e) {
			next(e);
		}
	}
}
