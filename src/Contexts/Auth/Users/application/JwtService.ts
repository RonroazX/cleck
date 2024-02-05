import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../../../Shared/domain/value-object/UnauthorizedError';

export interface JwtTokens {
	accessToken: string;
	refreshToken: string;
}

export class JWTService {
	sign(payload: object): JwtTokens {
		const accessToken = jwt.sign(payload, 'secret', { expiresIn: '1h' });
		const refreshToken = jwt.sign(payload, 'secret', { expiresIn: '1d' });

		return { accessToken, refreshToken };
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
