import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../../../Contexts/Shared/domain/value-object/UnauthorizedError";
import container from "../dependency-injection/configureContainer";
import { JWTService } from "../../../../Contexts/Auth/Users/application/JwtService";

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const jwtService = container.resolve<JWTService>('jwtService');
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new UnauthorizedError('No token provided');
  }

  const jwtToken = authHeaders.split(' ')[1];

  if (!jwtToken) {
    throw new UnauthorizedError('No token provided');
  }

  jwtService.verify(jwtToken);


}
