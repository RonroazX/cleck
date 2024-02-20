import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../../../Shared/infrastructure/Errors/ForbiddenError';
import { UserValidator } from './UserValidator';
import { UserRepository } from '../domain/UserRepository';

export interface jwtUserPayload {
  id: string;
  email: string;
  username: string;
}

export class JWTService {
  private readonly userValidatorService: UserValidator;
  private readonly userRepository: UserRepository;

  constructor(opts: { userValidator: UserValidator; userMongoRepository: UserRepository }) {
    this.userValidatorService = opts.userValidator;
    this.userRepository = opts.userMongoRepository;
  }

  signAccessToken(payload: object): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
  }

  signRefreshToken(payload: object): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  }

  async verifyRefreshToken(refreshToken: string): Promise<any> {
    const foundUser = await this.userValidatorService.getUserByToken(refreshToken);

    if (!foundUser) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: any) => {
        if (err) throw new ForbiddenError('Forbidden');
        const hackedUser = await this.userValidatorService.getUserByEmail(decoded.email);
        if (hackedUser) {
          hackedUser.revokeRefreshTokens();
          await this.userRepository.save(hackedUser);
        }
      });
      throw new ForbiddenError('Forbidden');
    }

    foundUser.removeRefreshToken(refreshToken);
    const newRefreshTokenArray = foundUser.refreshTokens;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: any) => {
      if (err) {
        foundUser?.revokeRefreshTokens();
        foundUser.addRefreshToken(...newRefreshTokenArray);
        await this.userRepository.save(foundUser);
        throw new ForbiddenError('Forbidden');
      }
      return decoded;
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
