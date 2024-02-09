import { NextFunction, Request, Response } from 'express';

import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';
import { UnauthorizedError } from '../../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';
import container from '../dependency-injection/configureContainer';

export interface UserRequest extends Request {
	body: {
		user: {
			id: string;
			username: string;
      email: string;
		};
	};
}

export async function validateJWT(
	req: UserRequest,
	res: Response,
	next: NextFunction
): Promise<void> {
	const jwtService = container.resolve<JWTService>('jwtService');
	const authHeaders = req.headers.authorization || req.headers.Authorization as string;

	if (!authHeaders) {
		throw new UnauthorizedError('No token provided');
	}

	const jwtToken = authHeaders.split(' ')[1];

	if (!jwtToken) {
		throw new UnauthorizedError('No token provided');
	}

	const result = await jwtService.verify(jwtToken);

	req.body.user = result;
	next();
}
