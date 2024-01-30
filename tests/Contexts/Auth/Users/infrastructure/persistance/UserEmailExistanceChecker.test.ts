import container from '../../../../../../src/apps/cleck/backend/dependency-injection/configureContainer';
import { UserEmailExistanceChecker } from '../../../../../../src/Contexts/Auth/Users/application/UserEmailExistanceChecker';
import { UserEmailAlreadyRegistered } from '../../../../../../src/Contexts/Auth/Users/domain/UserEmailAlreadyRegistered';
import { UserRepository } from '../../../../../../src/Contexts/Auth/Users/domain/UserRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { UserMother } from '../../domain/UserMother';

const userRepository = container.resolve<UserRepository>('userRepository');
const userEmailExistanceChecker = container.resolve<UserEmailExistanceChecker>(
	'userEmailExistanceChecker'
);
const environmentArranger = container.resolve<EnvironmentArranger>('environmentArranger');

beforeEach(async () => {
	await environmentArranger.arrange();
});

afterAll(async () => {
	await environmentArranger.close();
});

describe('UserEmailExistanceChecker', () => {
	it('should throw an error for an email already registered', async () => {
		await expect(async () => {
			const user = await UserMother.random();

			await userRepository.save(user);

			await userEmailExistanceChecker.run(user.email);
		}).rejects.toThrow(UserEmailAlreadyRegistered);
	});
});
