import { UserId } from '../../../../../src/Contexts/Auth/Shared/domain/Users/UserId';
import { UserCreatorRequest } from '../../../../../src/Contexts/Auth/Users/application/UserCreatorRequest';
import { User } from '../../../../../src/Contexts/Auth/Users/domain/User';
import { UserEmail } from '../../../../../src/Contexts/Auth/Users/domain/UserEmail';
import { UserName } from '../../../../../src/Contexts/Auth/Users/domain/UserName';
import { UserPassword } from '../../../../../src/Contexts/Auth/Users/domain/UserPassword';
import { UserIdMother } from '../../Shared/domain/Users/UserIdMother';
import { UserEmailMother } from './UserEmailMother';
import { UserNameMother } from './UserNameMother';
import { UserPasswordMother } from './UserPasswordMother';

export class UserMother {
	static create(
		id: UserId,
		username: UserName,
		password: UserPassword,
		email: UserEmail,
		refreshTokens: string[]
	): User {
		return new User({ id, username, password, email, refreshTokens });
	}

	static async random(): Promise<User> {
		return this.create(
			UserIdMother.random(),
			UserNameMother.random(),
			await UserPasswordMother.random(),
			UserEmailMother.random(),
			[]
		);
	}

	static fromRequest(request: UserCreatorRequest): User {
		return this.create(
			UserIdMother.create(request.id ?? UserIdMother.random().value),
			UserNameMother.create(request.username),
			new UserPassword(request.password),
			UserEmailMother.create(request.email),
			[]
		);
	}
}
