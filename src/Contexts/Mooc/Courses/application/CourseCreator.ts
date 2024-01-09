import { Inject, Service } from 'typedi';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { FileCourseRepository } from '../infrastructure/persistance/FileCourseRepository';

@Service()
export class CourseCreator {

	constructor(
    @Inject(() => FileCourseRepository)
    private readonly repository: CourseRepository
    ) {}

	async run(id: string, name: string, duration: string): Promise<void> {
		const course = new Course({ id, name, duration });

		return this.repository.save(course);
	}
}
