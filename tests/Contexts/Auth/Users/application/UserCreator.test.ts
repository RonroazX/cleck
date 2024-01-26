import {UserCreator} from "../../../../../src/Contexts/Auth/Users/application/UserCreator";
import { UserPasswordNotValid } from "../../../../../src/Contexts/Auth/Users/domain/UserPasswordNotValid";
import { HashServiceMock } from "../__mocks__/HashServiceMock";
import {UserRepositoryMock} from "../__mocks__/UserRepositoryMock";
import { UserMother } from "../domain/UserMother";
import { CreateUserRequestMother } from "./CreateUserRequestMother";

let repository: UserRepositoryMock;
let creator: UserCreator;
let hashService; HashServiceMock;

beforeEach(() => {
  repository = new UserRepositoryMock();
  hashService = new HashServiceMock();
  creator = new UserCreator({ userRepository: repository, hashService: hashService });
});

describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const request = await CreateUserRequestMother.random();

    const user = await UserMother.fromRequest(request);

    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(user);
  });

  it('should throw an error', async () => {
    await expect(async () => {
      const request = CreateUserRequestMother.invalidRequest();

      const user = UserMother.fromRequest(request);

      await creator.run(request);

      repository.assertSaveHaveBeenCalledWith(user);
    }).rejects.toThrow(UserPasswordNotValid);
  });
});
