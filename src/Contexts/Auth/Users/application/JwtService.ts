import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../../Shared/domain/value-object/UnauthorizedError';

export class JWTService {
	sign(payload: object): string {
		return jwt.sign(payload, 'secret');
	}

  verify(token: string): void {
    jwt.verify(token, 'secret', (err, next) => {
      if (err) {
        throw new UnauthorizedError('Invalid token')
      }
      console.log(next);
    });
  }
}
