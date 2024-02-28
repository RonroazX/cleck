import { StringValueObject } from "../../../Shared/domain/value-object/StringValueObject";
import jwt from 'jsonwebtoken';

export class JWT extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.verifyToken(value);
  }

  verifyToken(token: string): void {
		const tokenSecret = process.env.REFRESH_TOKEN_SECRET;
		if (!tokenSecret) {
			throw new Error('REFRESH_TOKEN_SECRET is not defined');
		}
			jwt.verify(token, tokenSecret);
	}
}
