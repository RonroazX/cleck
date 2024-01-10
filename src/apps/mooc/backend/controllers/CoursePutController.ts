import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';

import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';
import { Controller } from './Controller';

@Service()
export class CoursePutController implements Controller {
	constructor(private readonly courseCreator: CourseCreator) {}

	async run(req: Request, res: Response): Promise<void> {
		const { id, name, duration } = req.body as { id: string; name: string; duration: string };

		await this.courseCreator.run({ id, name, duration });

		res.status(httpStatus.CREATED).send();
	}
}
