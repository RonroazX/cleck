import * as bcrypt from 'bcrypt';

import { UserHashedPassword } from '../domain/UserHashedPassword';

export class PasswordValidator {
	async validate(password: string, hashedPassword: UserHashedPassword): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword.value);
	}
}
