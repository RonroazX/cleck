import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';

export class CourseRepositoryMock implements CourseRepository {
	private readonly mockSave = jest.fn();

	async save(course: Course): Promise<void> {
		await this.mockSave(course);
	}

	assertSaveHaveBeenCalledWith(expected: Course): void {
    expect(this.mockSave).toHaveBeenCalledWith(expected);
  }
}
