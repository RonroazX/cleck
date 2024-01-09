import { Request, Response, Router } from 'express';
import { Container } from 'typedi';
import { body } from 'express-validator';
import { CoursePutController } from '../controllers/CoursePutController';
import { validateSchema } from '.';

export const register = (router: Router): void => {
  const reqSchema = [
    body('id').exists().isString(),
    body('name').exists().isString(),
    body('duration').exists().isString(),
  ];

	const coursePutController = Container.get(CoursePutController);
	router.put('/courses/:id', reqSchema, validateSchema, (req: Request, res: Response) => coursePutController.run(req, res));
};
