import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';

import { Controller } from './Controller';
import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';

@Service()
export class CoursePutController implements Controller {
  constructor(private courseCreator: CourseCreator) {}

	async run(req: Request, res: Response) {
    const { id, name, duration } = req.body;

    await this.courseCreator.run(id, name, duration);

		res.status(httpStatus.CREATED).send();
	}
}
