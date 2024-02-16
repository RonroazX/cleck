import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../../../Shared/infrastructure/Errors/ForbiddenError';
import { UnauthorizedError } from '../../../Shared/infrastructure/Errors/UnauthorizedError';
import { UserValidator } from './UserValidator';

export interface jwtUserPayload {
	id: string;
	email: string;
	username: string;
}

export class JWTService {
  private readonly userValidatorService: UserValidator;

  constructor(opts: {userValidator: UserValidator}) {
    this.userValidatorService = opts.userValidator;
  }

	signAccessToken(payload: object): string {
		return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
	}

	signRefreshToken(payload: object): string {
		return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
	}

	async verifyRefreshToken(refreshToken: string): Promise<any> {
    const user = await this.userValidatorService.getUserByToken(refreshToken);

    if (!user) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: any) => {
        if (err) throw new ForbiddenError('Forbidden');
        const hackedUser = await this.userValidatorService.getUserByEmail(decoded.email);
      });
      throw new ForbiddenError('Forbidden');
    }

			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: any) => {
				if (err) {
					reject(new ForbiddenError('Forbidden'));
				}

				const decodedPayload = decoded as jwtUserPayload;

				const user = await this.userValidatorService.getUserByEmail(decodedPayload.email);
				if (!user) {
					reject(new UnauthorizedError('Unauthorized'));
				}
				resolve(decoded);
		});
	}

	async verifyAccessToken(accessToken: string): Promise<any> {
		return new Promise((resolve, reject) => {
			jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded: any) => {
				if (err) {
					reject(new ForbiddenError('Forbidden'));

					return;
				}

				resolve(decoded);
			});
		});
	}
}
