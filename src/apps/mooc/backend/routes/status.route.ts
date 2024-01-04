import { Request, Response, Router } from 'express';

import StatusController from '../controllers/StatusGetController';
import getContainer from '../dependency-injection';

export const register = async (router: Router): Promise<void> => {
  const container = await getContainer();
	const controller = container.get<StatusController>('Apps.mooc.controllers.StatusGetController');
	router.get('/status', (req: Request, res: Response) => {
		controller.run(req, res);
	});
};
