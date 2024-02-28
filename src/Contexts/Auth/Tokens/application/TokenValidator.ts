import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../../Shared/infrastructure/Errors/UnauthorizedError';

export type TokenType = 'accessToken' | 'refreshToken';

export class TokenValidator {
  static verify(token: string, tokenType: TokenType): any {
    const tokenSecret = tokenType === 'accessToken' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    if (!tokenSecret) {
      throw new Error('No secretToken provided');
    }
    try {
      return jwt.verify(token, tokenSecret);
    } catch (error) {
      throw new UnauthorizedError('Unauthorized');
    }
  }
}
