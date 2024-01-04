import { Request, Response, Router } from 'express';

import { CoursePutController } from '../controllers/CoursePutController';
import getContainer from '../dependency-injection';

export const register = async (router: Router): Promise<void> => {
	const container = await getContainer();
	const coursePutController = container.get<CoursePutController>(
		'Apps.mooc.controllers.CoursePutController'
	);
	router.put('/courses/:id', (req: Request, res: Response) => coursePutController.run(req, res));
};
