import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { TokenId } from '../../Shared/domain/Users/TokenId';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserIP } from '../../Shared/domain/Users/UserIP';
import { UserAgent } from '../../Users/domain/UserAgent';
import { JWT } from '../domain/JWT';
import { RefreshToken } from '../domain/RefreshToken';
import { TokenCreatorRequest } from './TokenCreatorRequest';

export class TokenCreator {
	static createJwtAccessToken(payload: object): string {
		const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
		if (!tokenSecret) {
			throw new Error('ACCESS_TOKEN_SECRET is not defined');
		}

		return jwt.sign(payload, tokenSecret, { expiresIn: '30s' });
	}

	static createJwtRefreshToken(payload: object): string {
		const tokenSecret = process.env.REFRESH_TOKEN_SECRET;
		if (!tokenSecret) {
			throw new Error('REFRESH_TOKEN_SECRET is not defined');
		}

		return jwt.sign(payload, tokenSecret, { expiresIn: '1d' });
	}

	static createRefreshToken(request: TokenCreatorRequest): RefreshToken {
		const currentDate = new Date(Date.now());
		const expDate = new Date(currentDate.getTime());
		expDate.setDate(expDate.getDate() + 1);

		return new RefreshToken({
			isActive: request.isActive,
			dateAdd: currentDate,
			dateExp: expDate,
			jwt: new JWT(request.jwt),
			tokenId: new TokenId(uuidv4()),
			userAgent: new UserAgent(request.userAgent),
			userId: new UserId(request.userId),
			userIP: new UserIP(request.userIP)
		});
	}
}
