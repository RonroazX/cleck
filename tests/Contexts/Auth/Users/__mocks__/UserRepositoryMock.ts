import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import {UserRepository} from "../../../../../src/Contexts/Auth/Users/domain/UserRepository";

export class UserRepositoryMock implements UserRepository {
  private readonly mockSave = jest.fn();

  async save(course: Course): Promise<void> {
    await this.mockSave(course);
  }

  assertSaveHaveBeenCalledWith(expected: Course): void {
    expect(this.mockSave).toHaveBeenCalledWith(expected);
  }
}
