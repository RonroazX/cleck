import { NextFunction, Request, Response, Router } from 'express';
import httpStatus from 'http-status';

import { validateJWT } from '../middlewares/authMiddleware';

export const register = (router: Router): void => {
	router.post('/group/create', validateJWT, (req: Request, res: Response, next: NextFunction) => {
		console.log(req.body);
		res.status(httpStatus.CREATED).send();
	});
};
