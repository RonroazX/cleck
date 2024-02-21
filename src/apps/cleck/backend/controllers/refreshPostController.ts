import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';
import { UnauthorizedError } from '../../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';
import { Controller } from './Controller';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { ForbiddenError } from '../../../../Contexts/Shared/infrastructure/Errors/ForbiddenError';
import { UserRepository } from '../../../../Contexts/Auth/Users/domain/UserRepository';

export class RefreshPostController implements Controller {
  private readonly jwtService: JWTService;
  private readonly userValidatorService: UserValidator;
  private readonly userRepository: UserRepository;
  constructor(opts: { jwtService: JWTService; userValidator: UserValidator; userRepository: UserRepository }) {
    this.jwtService = opts.jwtService;
    this.userValidatorService = opts.userValidator;
    this.userRepository = opts.userRepository;
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cookies: { refreshToken: string } = req.cookies;

    if (!cookies.refreshToken) {
      throw new UnauthorizedError('No refresh token provided');
    }

    const refreshToken = cookies.refreshToken;

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });

    const foundUser = await this.userValidatorService.getUserByToken(refreshToken);

    if (!foundUser) {
      try {
        const decoded = await this.jwtService.verify(refreshToken, 'refreshToken');
        const hackedUser = await this.userValidatorService.getUserByEmail(decoded.email);
        if (hackedUser) {
          hackedUser.revokeRefreshTokens();
          await this.userRepository.save(hackedUser);
        }
      } catch (error) {
        next(new ForbiddenError('Forbidden'));
      }
    }

    foundUser!.removeRefreshToken(refreshToken);
    const newRefreshTokenArray = foundUser!.refreshTokens;

    try {
      const decoded = await this.jwtService.verify(refreshToken, 'refreshToken');

      const payload = { id: decoded.id, username: decoded.username, email: decoded.email };
      const accessToken = this.jwtService.signAccessToken(payload);
      const newRefreshToken = this.jwtService.signRefreshToken(payload);

      foundUser!.addRefreshToken(...newRefreshTokenArray, newRefreshToken);
      await this.userRepository.save(foundUser!);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      });
      res.json({ accessToken });
    } catch (error) {
      foundUser?.addRefreshToken(...newRefreshTokenArray);
      await this.userRepository.save(foundUser!);
      next(new ForbiddenError('Forbidden'));
    }
  }
}
