import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';
import { CourseCreatorRequest } from '../../../../Contexts/Mooc/Courses/application/CourseCreatorRequest';
import { Controller } from './Controller';

export class CoursePutController implements Controller {
	private readonly courseCreator: CourseCreator;
	constructor(opts: { courseCreator: CourseCreator }) {
		this.courseCreator = opts.courseCreator;
	}

	async run(req: Request, res: Response): Promise<void> {
		const { id, name, duration } = req.body as CourseCreatorRequest;

		await this.courseCreator.run({ id, name, duration });

		res.status(httpStatus.CREATED).send();
	}
}
