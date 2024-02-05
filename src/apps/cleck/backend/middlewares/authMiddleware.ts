import { NextFunction, Request, Response } from 'express';

import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';
import { UnauthorizedError } from '../../../../Contexts/Shared/domain/value-object/UnauthorizedError';
import container from '../dependency-injection/configureContainer';

export async function validateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
	const jwtService = container.resolve<JWTService>('jwtService');
	const authHeaders = req.headers.authorization;

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
