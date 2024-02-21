import jwt from 'jsonwebtoken';

type TokenType = 'refreshToken' | 'accessToken';
export class JWTService {
  signAccessToken(payload: object): string {
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!tokenSecret) throw new Error("ACCESS_TOKEN_SECRET is not defined");
    return jwt.sign(payload, tokenSecret, { expiresIn: '30s' });
  }

  signRefreshToken(payload: object): string {
    const tokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!tokenSecret) throw new Error("REFRESH_TOKEN_SECRET is not defined");
    return jwt.sign(payload, tokenSecret, { expiresIn: '15s' });
  }

  async verify(token: string, tokenType: TokenType): Promise<any> {
    const tokenSecret = tokenType == 'accessToken' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    if (!tokenSecret) throw new Error("REFRESH_TOKEN_SECRET or ACCESS_TOKEN_SECRET is not defined");
    return new Promise((resolve, reject) => {
      jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    })
  }
}


