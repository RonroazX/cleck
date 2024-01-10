import { Inject, Service } from 'typedi';

import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { FileCourseRepository } from '../infrastructure/persistance/FileCourseRepository';
import { CourseCreatorRequest } from './CourseCreatorRequest';

@Service()
export class CourseCreator {
	constructor(
		@Inject(() => FileCourseRepository)
		private readonly repository: CourseRepository
	) {}

	async run(request: CourseCreatorRequest): Promise<void> {
		const { id, name, duration } = request;
		const course = new Course({ id: new Uuid(id), name, duration });

		return this.repository.save(course);
	}
}
