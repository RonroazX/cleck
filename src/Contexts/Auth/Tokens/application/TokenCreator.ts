import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { ClientId } from '../../Shared/domain/Users/TokenId';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserIP } from '../../Shared/domain/Users/UserIP';
import { UserAgent } from '../../Users/domain/UserAgent';
import { JWT } from '../domain/JWT';
import { RefreshToken } from '../domain/RefreshToken';
import { TokenCreatorRequest } from './TokenCreatorRequest';
import { AUTH } from '../../Shared/utils/constants';

export class TokenCreator {
	static createJwtAccessToken(payload: object): string {
		return jwt.sign(payload, AUTH.accessTokenSecret, { expiresIn: AUTH.accessTokenExp });
	}

	static createJwtRefreshToken(payload: object): string {
		return jwt.sign(payload, AUTH.refreshTokenSecret, { expiresIn: AUTH.refreshTokenExp });
	}

	static createRefreshToken(request: TokenCreatorRequest): RefreshToken {
		const currentDate = new Date(Date.now());
		const expDate = new Date(currentDate.getTime());
		expDate.setDate(expDate.getDate() + 1);

		return new RefreshToken({
			isActive: request.isActive,
			dateAdd: currentDate,
			dateExp: expDate,
			dateUpd: currentDate,
			jwt: new JWT(request.jwt),
			clientId: new ClientId(uuidv4()),
			userAgent: new UserAgent(request.userAgent),
			userId: new UserId(request.userId),
			userIP: new UserIP(request.userIP)
		});
	}
}
