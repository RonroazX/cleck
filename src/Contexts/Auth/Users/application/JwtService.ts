import jwt from 'jsonwebtoken';

import container from '../../../../apps/cleck/backend/dependency-injection/configureContainer';
import { ForbiddenError } from '../../../Shared/infrastructure/Errors/ForbiddenError';
import { UnauthorizedError } from '../../../Shared/infrastructure/Errors/UnauthorizedError';
import { UserValidator } from './UserValidator';

export interface jwtUserPayload {
	id: string;
	email: string;
	username: string;
}

export class JWTService {
	private readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	private readonly refreshTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	signAccessToken(payload: object): string {
		if (!this.accessTokenSecret) {
			throw new Error('no accessTokenSecret provided');
		}
		const accessToken = jwt.sign(payload, this.accessTokenSecret, { expiresIn: '30s' });

		return accessToken;
	}

	signRefreshToken(payload: object): string {
		if (!this.refreshTokenSecret) {
			throw new Error('no refreshTokenSecret provided');
		}
		const refreshToken = jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '1d' });

		return refreshToken;
	}

	async verifyRefreshToken(refreshToken: string): Promise<any> {
		const userValidator = container.resolve<UserValidator>('userValidator');

    const user = await userValidator.getUserByEmail(refreshToken);

		return new Promise((resolve, reject) => {
			if (!this.refreshTokenSecret) {
				reject(new Error('no refreshTokenSecret provided'));

				return;
			}

      if (!user) reject(new ForbiddenError('Forbidden'));

			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			jwt.verify(refreshToken, this.refreshTokenSecret, async (err, decoded: any) => {
				if (err) {
					reject(new ForbiddenError('Forbidden'));
				}

				const decodedPayload = decoded as jwtUserPayload;

				const user = await userValidator.getUserByEmail(decodedPayload.email);
				if (!user) {
					reject(new UnauthorizedError('Unauthorized'));
				}
				resolve(decoded);
			});
		});
	}

	async verifyAccessToken(accessToken: string): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!this.accessTokenSecret) {
				reject(new Error('no refreshTokenSecret provided'));

				return;
			}
			jwt.verify(accessToken, this.accessTokenSecret, (err, decoded: any) => {
				if (err) {
					reject(new ForbiddenError('Forbidden'));

					return;
				}

				resolve(decoded);
			});
		});
	}
}
