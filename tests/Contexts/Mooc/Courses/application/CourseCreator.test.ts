import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CourseNameLengthExceed } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNameLengthExceed';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseMother } from '../domain/CourseMother';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

beforeEach(() => {
	repository = new CourseRepositoryMock();
	creator = new CourseCreator({ courseRepository: repository });
});

describe('CourseCreator', () => {
	it('should create a valid course', async () => {
		const request = CreateCourseRequestMother.random();

		const course = CourseMother.fromRequest(request);

		await creator.run(request);

		repository.assertSaveHaveBeenCalledWith(course);
	});

	it('should throw an error', () => {
		expect(() => {
			const request = CreateCourseRequestMother.invalidRequest();

			const course = CourseMother.fromRequest(request);

			creator.run(request);

			repository.assertSaveHaveBeenCalledWith(course);
		}).toThrow(CourseNameLengthExceed);
	});
});
