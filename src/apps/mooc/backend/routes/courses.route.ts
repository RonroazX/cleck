import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { CoursePutController } from '../controllers/CoursePutController';
import container from '../dependency-injection/configureContainer';
import { validateSchema } from '.';

export const register = (router: Router): void => {
	const reqSchema = [
		body('id').isString().withMessage('id must be a string'),
		body('name').isString().withMessage('name must be a string'),
		body('duration').isString().withMessage('duration must be a string')
	];

	const coursePutController = container.resolve<CoursePutController>('coursePutController');
	router.put(
		'/courses/:id',
		reqSchema,
		validateSchema,
		(req: Request, res: Response, next: NextFunction) => {
			coursePutController.run(req, res).catch(next);
		}
	);
};
