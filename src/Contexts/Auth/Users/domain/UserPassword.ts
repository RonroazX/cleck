import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import AMConstants from '../../Shared/utils/constants';
import { HashUserPasswordService } from '../application/HashUserPassword';
import { UserHashedPassword } from './UserHashedPassword';
import { UserPasswordNotValid } from './UserPasswordNotValid';

export class UserPassword extends StringValueObject {
	static async hashUserPassword(
		password: string,
		hashService: HashUserPasswordService
	): Promise<UserHashedPassword> {
		if (!this.validate(password)) {
			throw new UserPasswordNotValid(`The password: <${password}> is not valid`);
		}

		const hashedPassword = await hashService.hash(password);

		return new UserHashedPassword(hashedPassword);
	}

	private static validate(password: string): boolean {
		const passwordRegex = new RegExp(
			`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${AMConstants.MIN_PASSWORD_LENGTH},}$`
		);
		if (password.match(passwordRegex)) {
			return true;
		}

		return false;
	}
}
