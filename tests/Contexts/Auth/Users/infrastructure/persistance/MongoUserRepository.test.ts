import container from '../../../../../../src/apps/cleck/backend/dependency-injection/configureContainer';
import { UserRepository } from '../../../../../../src/Contexts/UserManagement/Users/domain/UserRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { UserMother } from '../../domain/UserMother';

const repository: UserRepository = container.resolve<UserRepository>('userRepository');
const environmentArranger: EnvironmentArranger =
	container.resolve<EnvironmentArranger>('environmentArranger');

beforeEach(async () => {
	await environmentArranger.arrange();
});

afterAll(async () => {
	await environmentArranger.close();
});

describe('MongoUserRepository', () => {
	describe('#save', () => {
		it('should save a user', async () => {
			const user = await UserMother.random();

			await repository.save(user);
		});
	});
});
