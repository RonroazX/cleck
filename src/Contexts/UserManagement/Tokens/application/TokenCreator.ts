import jwt from 'jsonwebtoken';
import { AUTH } from '../../Shared/utils/constants';

export class TokenCreator {
	createJwtAccessToken(payload: object): string {
		return jwt.sign(payload, AUTH.accessTokenSecret, { expiresIn: AUTH.accessTokenExp });
	}

	createJwtRefreshToken(payload: object): string {
		return jwt.sign(payload, AUTH.refreshTokenSecret, { expiresIn: AUTH.refreshTokenExp });
	}

  createTokens(payload: object): {accessToken: string, refreshToken: string} {
    const accessToken = this.createJwtAccessToken(payload);
    const refreshToken = this.createJwtRefreshToken(payload);
    return {accessToken, refreshToken};
  }
}
