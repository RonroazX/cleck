import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../../../Shared/domain/value-object/UnauthorizedError';

export class JWTService {
	signAccessToken(payload: object): string {
		const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

		return accessToken;
	}

  signRefreshToken(payload: object): string {
		const refreshToken = jwt.sign(payload, 'secret', { expiresIn: '1d' });

		return refreshToken;
	}

	async verify(token: string): Promise<any> {
		return new Promise((resolve, reject) => {
			jwt.verify(token, 'secret', (err, result) => {
				if (err) {
					reject(new UnauthorizedError('Invalid token'));
				}
				resolve(result);
			});
		});
	}
}
