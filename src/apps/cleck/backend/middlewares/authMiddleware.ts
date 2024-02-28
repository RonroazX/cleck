import { NextFunction, Request, Response } from 'express';

import { TokenValidator } from '../../../../Contexts/Auth/Tokens/application/TokenValidator';
import { UnauthorizedError } from '../../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';

export interface UserRequest extends Request {
	body: {
		user: {
			id: string;
			username: string;
			email: string;
		};
	};
}

export function validateJWT(req: UserRequest, res: Response, next: NextFunction): void {
	try {
		const authHeaders = req.headers.authorization ?? (req.headers.Authorization as string);

		if (!authHeaders) {
			throw new UnauthorizedError('No token provided');
		}

		const jwtToken = authHeaders.split(' ')[1];

		if (!jwtToken) {
			throw new UnauthorizedError('No token provided');
		}

		const result = TokenValidator.verify(jwtToken, 'accessToken');
		// eslint-disable-next-line require-atomic-updates
		req.body.user = result;
		next();
	} catch (error) {
		next(error);
	}
}
