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
		const accessToken = jwt.sign(payload, this.accessTokenSecret, { expiresIn: '20s' });

		return accessToken;
	}

	signRefreshToken(payload: object): string {
		if (!this.refreshTokenSecret) {
			throw new Error('no refreshTokenSecret provided');
		}
		const refreshToken = jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '1d' });

		return refreshToken;
	}

	async verify(refreshToken: string): Promise<any> {
		if (!this.refreshTokenSecret) {
			throw new Error('no refreshTokenSecret provided');
		}
		const userValidator = container.resolve<UserValidator>('userValidator');

		jwt.verify(refreshToken, this.refreshTokenSecret, async (err, decoded: any) => {
			if (err) {
				throw new ForbiddenError('Forbidden');
			}
      console.log('El decoded es',decoded);

			const user = await userValidator.getUserByEmail(decoded.email) as {};

			if (!user) {
				throw new UnauthorizedError('Unauthorized');
			}

			return decoded;
		});
	}
}
