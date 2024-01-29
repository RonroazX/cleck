import { UserEmail } from '../domain/UserEmail';
import { UserNotFound } from '../domain/UserNotFound';
import { UserRepository } from '../domain/UserRepository';
import { JWTService } from './JwtService';
import { PasswordValidator } from './PasswordValidator';
import { UserValidateRequest } from './UserValidateRequest';

export class UserValidator {
	private readonly userRepository: UserRepository;
	private readonly passwordValidator: PasswordValidator;
	private readonly jwtService: JWTService;

	constructor(opts: {
		userRepository: UserRepository;
		passwordValidator: PasswordValidator;
		jwtService: JWTService;
	}) {
		this.userRepository = opts.userRepository;
		this.passwordValidator = opts.passwordValidator;
		this.jwtService = opts.jwtService;
	}

	async run(request: UserValidateRequest): Promise<string> {
		const { email, password } = request;

		const user = await this.userRepository.searchUserByEmail(new UserEmail(email));

		if (!user) {
			throw new UserNotFound(`User: <${email} not found>`);
		}

    console.log(user);

		const isPasswordValid = await this.passwordValidator.validate(password, user.password);

		if (!isPasswordValid) {
			throw new UserNotFound(`User: <${user.email.value} not found>`);
		}

		const payload = { id: user.id.value, username: user.username.value };
		const accessToken = this.jwtService.sign(payload);

		return accessToken;
	}
}
