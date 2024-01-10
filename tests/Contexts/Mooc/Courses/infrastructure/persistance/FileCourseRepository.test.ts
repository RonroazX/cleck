import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistance/FileCourseRepository';
import { Uuid } from '../../../../../../src/Contexts/Shared/domain/value-object/Uuid';

describe('FileCourseRepository', () => {
	it('should save a course', async () => {
		const expectedCourse = new Course({
			id: new Uuid('0766c602-d4d4-48b6-9d50-d3253123275e'),
			name: 'name',
			duration: 'duration'
		});
		const repository = new FileCourseRepository();

		await repository.save(expectedCourse);

		const course = await repository.search('0766c602-d4d4-48b6-9d50-d3253123275e');
		expect(course).toEqual(expectedCourse);
	});
});
