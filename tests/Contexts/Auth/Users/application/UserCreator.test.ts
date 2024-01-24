import {UserCreator} from "../../../../../src/Contexts/Auth/Users/application/UserCreator";
import {UserRepositoryMock} from "../__mocks__/UserRepositoryMock";

let repository: UserRepositoryMock;
let creator: UserCreator;

beforeEach(() => {
  repository = new UserRepositoryMock();
  creator = new UserCreator({ userRepository: repository });
});

describe('UserCreator', () => {
  it('should create a valid user', async () => {
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
