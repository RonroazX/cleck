
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
*/
