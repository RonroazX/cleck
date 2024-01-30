import { UserCreator } from '../../../../../src/Contexts/Auth/Users/application/UserCreator';
import { UserEmailAlreadyRegistered } from '../../../../../src/Contexts/Auth/Users/domain/UserEmailAlreadyRegistered';
import { UserPasswordNotValid } from '../../../../../src/Contexts/Auth/Users/domain/UserPasswordNotValid';
import { HashServiceMock } from '../__mocks__/HashServiceMock';
import { UserEmailExistanceCheckerMock } from '../__mocks__/UserEmailExistanceCheckerMock';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserMother } from '../domain/UserMother';
import { CreateUserRequestMother } from './CreateUserRequestMother';

let repository: UserRepositoryMock;
let creator: UserCreator;
let hashService;
let userEmailExistanceChecker: UserEmailExistanceCheckerMock;

beforeEach(() => {
	repository = new UserRepositoryMock();
	hashService = new HashServiceMock();
	userEmailExistanceChecker = new UserEmailExistanceCheckerMock({ userRepository: repository });
	creator = new UserCreator({ userRepository: repository, hashService, userEmailExistanceChecker });
});

describe('UserCreator', () => {
	it('should create a valid user', async () => {
		const request = await CreateUserRequestMother.random();

		const user = UserMother.fromRequest(request);

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

	it('should throw an error UserEmail already registered', async () => {
		await expect(async () => {
			userEmailExistanceChecker.mockEmailAlreadyRegistered();

			const request = await CreateUserRequestMother.random();

			const user = UserMother.fromRequest(request);

			await creator.run(request);

			repository.assertSaveHaveBeenCalledWith(user);
		}).rejects.toThrow(UserEmailAlreadyRegistered);
	});
});
