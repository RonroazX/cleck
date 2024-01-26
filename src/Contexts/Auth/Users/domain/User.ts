import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserEmail } from './UserEmail';
import { UserHashedPassword } from './UserHashedPassword';
import { UserName } from './UserName';

interface UserParams {
  id: UserId;
	username: UserName;
	email: UserEmail;
	password: UserHashedPassword;
}

export class User extends AggregateRoot {
	readonly id: UserId;
	readonly username: UserName;
	readonly email: UserEmail;
	readonly password: UserHashedPassword;

	constructor({ id, username, email, password }: UserParams) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	toPrimitives(): { id: string; username: string; email: string; password: string } {
		return {
			id: this.id.value,
			username: this.username.value,
			email: this.email.value,
			password: this.password.value
		};
	}
}
