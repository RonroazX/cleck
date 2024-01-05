import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import { Controller } from './Controller';

@Service()
export class CoursePutController implements Controller {
	run(req: Request, res: Response): void {
		res.status(httpStatus.CREATED).send();
	}
}
