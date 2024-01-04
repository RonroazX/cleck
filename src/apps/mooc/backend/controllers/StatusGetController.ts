import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';

export default class StatusGetController implements Controller {
  public marole: string = 'marole';

	run(req: Request, res: Response): void {
		res.status(httpStatus.OK).send();
	}
}
