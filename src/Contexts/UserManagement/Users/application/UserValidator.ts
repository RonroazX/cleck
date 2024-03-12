import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserNotFound } from '../domain/UserNotFound';
import { UserRepository } from '../domain/UserRepository';
import { PasswordValidator } from './PasswordValidator';

export class UserValidator {
	private readonly userRepository: UserRepository;
	private readonly passwordValidator: PasswordValidator;

	constructor(opts: { userRepository: UserRepository; passwordValidator: PasswordValidator }) {
		this.userRepository = opts.userRepository;
		this.passwordValidator = opts.passwordValidator;
	}

	async run({email, password}: {email: string; password: string}): Promise<User> {

		const user = await this.userRepository.searchUserByEmail(new UserEmail(email));

		if (!user) {
			throw new UserNotFound(`User: <${email} not found>`);
		}

		const isPasswordValid = await this.passwordValidator.validate(password, user.password);

		if (!isPasswordValid) {
			throw new UserNotFound(`User: <${user.email.value} not found>`);
		}

		return user;
	}
}
