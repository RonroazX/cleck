import { UserRepository } from "../../../../../../src/Contexts/Auth/Users/domain/UserRepository";
import container from "../../../../../../src/apps/cleck/backend/dependency-injection/configureContainer";
import { EnvironmentArranger } from "../../../../Shared/infrastructure/arranger/EnvironmentArranger";
import { UserMother } from "../../domain/UserMother";

const repository: UserRepository = container.resolve<UserRepository>('userRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.resolve<Promise<EnvironmentArranger>>('environmentArranger');


beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('MongoUserRepository', () => {
  describe('#save', () => {
    it('should save a user', async () => {
      const user = await UserMother.random();

      await repository.save(user);
    });
  });
});
