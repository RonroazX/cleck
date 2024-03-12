import { HashUserPasswordService } from '../../../../../src/Contexts/UserManagement/Users/application/HashUserPassword';
import { UserHashedPassword } from '../../../../../src/Contexts/UserManagement/Users/domain/UserHashedPassword';
import { UserPassword } from '../../../../../src/Contexts/UserManagement/Users/domain/UserPassword';
import { PasswordMother } from '../../../Shared/domain/PasswordMother';

export class UserPasswordMother {
	static async create(value: string): Promise<UserHashedPassword> {
		return UserPassword.hashUserPassword(value, new HashUserPasswordService());
	}

	static async random(): Promise<UserHashedPassword> {
		return this.create(PasswordMother.random(15));
	}

	static invalidPassword(): string {
		return PasswordMother.random(5);
	}
}
