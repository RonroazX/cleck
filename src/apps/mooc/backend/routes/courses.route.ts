import { Request, Response, Router } from 'express';
import { Container } from 'typedi';
import { CoursePutController } from '../controllers/CoursePutController';

export const register = async (router: Router): Promise<void> => {
	const coursePutController = Container.get(CoursePutController);
	router.put('/courses/:id', (req: Request, res: Response) => coursePutController.run(req, res));
};
