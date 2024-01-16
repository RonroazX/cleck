import { Request, Response, Router } from 'express';

import StatusGetController from '../controllers/StatusGetController';
import container from '../dependency-injection/configureContainer';

export const register = (router: Router): void => {
	const controller = container.resolve<StatusGetController>('statusGetController');
	router.get('/status', (req: Request, res: Response) => {
		controller.run(req, res);
	});
};
