import jwt from 'jsonwebtoken';

export class JWTService {
  sign(payload: object): string {
    return jwt.sign(payload, 'secret');
  }
}
