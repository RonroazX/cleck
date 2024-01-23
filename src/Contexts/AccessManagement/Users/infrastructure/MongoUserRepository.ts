import { MongoRepository } from '../../../Shared/infrastructure/persistance/mongo/MongoRepository';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
	async save(user: User): Promise<void> {
		this.persist(user.id.value, user);
	}

	protected collectionName(): string {
		return 'users';
	}
}
