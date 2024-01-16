import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from '../domain/Course';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseCreatorRequest } from './CourseCreatorRequest';

export class CourseCreator {
	private readonly courseRepository: CourseRepository;
	constructor(opts: { courseRepository: CourseRepository }) {
		this.courseRepository = opts.courseRepository;
	}

	async run(request: CourseCreatorRequest): Promise<void> {
		const { id, name, duration } = request;
		const course = new Course({
			id: new CourseId(id),
			name: new CourseName(name),
			duration: new CourseDuration(duration)
		});

		return this.courseRepository.save(course);
	}
}
