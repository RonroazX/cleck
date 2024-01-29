import { UserId } from '../../../../../src/Contexts/Auth/Shared/domain/Users/UserId';
import { UserCreatorRequest } from '../../../../../src/Contexts/Auth/Users/application/UserCreatorRequest';
import { UserEmail } from '../../../../../src/Contexts/Auth/Users/domain/UserEmail';
import { UserName } from '../../../../../src/Contexts/Auth/Users/domain/UserName';
import { UserPassword } from '../../../../../src/Contexts/Auth/Users/domain/UserPassword';
import { UserIdMother } from '../../Shared/domain/Users/UserIdMother';
import { UserEmailMother } from '../domain/UserEmailMother';
import { UserNameMother } from '../domain/UserNameMother';
import { UserPasswordMother } from '../domain/UserPasswordMother';

export class CreateUserRequestMother {
	static create(
		id: UserId,
		username: UserName,
		password: UserPassword,
		email: UserEmail
	): UserCreatorRequest {
		return { id: id.value, email: email.value, password: password.value, username: username.value };
	}

	static async random(): Promise<UserCreatorRequest> {
		return this.create(
			UserIdMother.random(),
			UserNameMother.random(),
			await UserPasswordMother.random(),
			UserEmailMother.random()
		);
	}

	static invalidRequest(): UserCreatorRequest {
		return {
			id: UserIdMother.random().value,
			email: UserEmailMother.random().value,
			password: UserPasswordMother.invalidPassword(),
			username: UserNameMother.random().value
		};
	}
}
