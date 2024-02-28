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
	refreshTokens: string[];
}

export class User extends AggregateRoot {
	readonly id: UserId;
	readonly username: UserName;
	readonly email: UserEmail;
	readonly password: UserHashedPassword;

	constructor({ id, username, email, password, refreshTokens }: UserParams) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	static fromPrimitives(plainData: {
		id: string;
		username: string;
		email: string;
		password: string;
		refreshTokens: string[];
	}): User {
		return new User({
			id: new UserId(plainData.id),
			email: new UserEmail(plainData.email),
			password: new UserHashedPassword(plainData.password),
			username: new UserName(plainData.username),
			refreshTokens: plainData.refreshTokens
		});
	}

	toPrimitives(): {
		id: string;
		username: string;
		email: string;
		password: string;
	} {
		return {
			id: this.id.value,
			username: this.username.value,
			email: this.email.value,
			password: this.password.value
		};
	}
}
