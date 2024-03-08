import { NextFunction, Response, Router, Request } from 'express';
import httpStatus from 'http-status';

export const register = (router: Router): void => {
	router.post(
		'/group/create',
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		(req: Request, res: Response, next: NextFunction) => {
			res.status(httpStatus.CREATED).send();
		}
	);
};
