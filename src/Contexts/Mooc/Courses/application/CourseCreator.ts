import { Inject, Service } from 'typedi';

import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from '../domain/Course';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';
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
		const course = new Course({
			id: new CourseId(id),
			name: new CourseName(name),
			duration: new CourseDuration(duration)
		});

		return this.repository.save(course);
	}
}
