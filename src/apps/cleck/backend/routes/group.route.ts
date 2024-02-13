import { NextFunction, Response, Router } from 'express';
import httpStatus from 'http-status';

import { UserRequest, validateJWT } from '../middlewares/authMiddleware';

export const register = (router: Router): void => {
	router.post(
		'/group/create',
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		validateJWT,
		(req: UserRequest, res: Response, next: NextFunction) => {
			res.status(httpStatus.CREATED).send();
		}
	);
};
