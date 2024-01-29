import { Nullable } from '../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../Shared/infrastructure/persistance/mongo/MongoRepository';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserRepository } from '../domain/UserRepository';

interface UserDocument {
	_id: string;
	email: string;
	username: string;
	password: string;
}

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
	async searchUserByEmail(email: UserEmail): Promise<Nullable<User>> {
		const collection = await this.collection();

		const userDocument = await collection.findOne<UserDocument>({
			email: email.value
		});

		return userDocument
			? User.fromPrimitives({
					id: userDocument._id,
					email: userDocument.email,
					password: userDocument.password,
					username: userDocument.username
				})
			: null;
	}

	async save(user: User): Promise<void> {
		await this.persist(user.id.value, user);
	}

	protected collectionName(): string {
		return 'users';
	}
}
