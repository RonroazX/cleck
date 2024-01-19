import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';
import { Controller } from './Controller';

type CoursePutRequest = Request & {
	body: {
		id: string;
		name: string;
		duration: string;
	};
};

export class CoursePutController implements Controller {
	private readonly courseCreator: CourseCreator;
	constructor(opts: { courseCreator: CourseCreator }) {
		this.courseCreator = opts.courseCreator;
	}

	async run(req: CoursePutRequest, res: Response): Promise<void> {
		try {
			const { id, name, duration } = req.body;

			await this.courseCreator.run({ id, name, duration });

			res.status(httpStatus.CREATED).send();
		} catch (error) {
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
		}
	}
}
