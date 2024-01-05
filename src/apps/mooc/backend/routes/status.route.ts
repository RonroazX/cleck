import { Request, Response, Router } from 'express';
import { Container } from 'typedi';

import StatusController from '../controllers/StatusGetController';

export const register = (router: Router): void => {
	const controller = Container.get(StatusController);
	router.get('/status', (req: Request, res: Response) => {
		controller.run(req, res);
	});
};
