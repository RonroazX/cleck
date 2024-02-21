import { Nullable } from '../../../Shared/domain/Nullable';
import { User } from './User';
import { UserEmail } from './UserEmail';

export interface UserRepository {
	save(user: User): Promise<void>;

	searchUserByEmail(email: UserEmail): Promise<Nullable<User>>;

	searchUserByToken(token: string): Promise<Nullable<User>>;
}
