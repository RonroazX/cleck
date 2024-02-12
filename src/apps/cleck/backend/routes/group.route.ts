import { NextFunction, Response, Router } from 'express';
import httpStatus from 'http-status';

import { UserRequest, validateJWT } from '../middlewares/authMiddleware';

export const register = (router: Router): void => {
	router.post(
		'/group/create',
		validateJWT,
		(req: UserRequest, res: Response, next: NextFunction) => {
			//console.log(req.body.user);
			res.status(httpStatus.CREATED).send();
		}
	);
};
