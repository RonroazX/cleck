import { v4 as uuidv4 } from 'uuid';

import { UserId } from '../../Shared/domain/Users/UserId';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserRepository } from '../domain/UserRepository';
import { HashUserPasswordService } from './HashUserPassword';
import { UserCreatorRequest } from './UserCreatorRequest';
import { UserEmailExistanceChecker } from './UserEmailExistanceChecker';

export class UserCreator {
	private readonly userRepository: UserRepository;
	private readonly hashService: HashUserPasswordService;
	private readonly userEmailExistanceChecker: UserEmailExistanceChecker;
	constructor(opts: {
		userRepository: UserRepository;
		hashService: HashUserPasswordService;
		userEmailExistanceChecker: UserEmailExistanceChecker;
	}) {
		this.userRepository = opts.userRepository;
		this.hashService = opts.hashService;
		this.userEmailExistanceChecker = opts.userEmailExistanceChecker;
	}

	async run(request: UserCreatorRequest): Promise<void> {
		const { id, email, password, username } = request;
		const userEmail = new UserEmail(email);
		await this.userEmailExistanceChecker.run(userEmail);
		const hashedPassword = await UserPassword.hashUserPassword(password, this.hashService);
		const user = new User({
			id: new UserId(id ?? uuidv4()),
			email: userEmail,
			username: new UserName(username),
			password: hashedPassword,
      refreshTokens: [],
		});

		await this.userRepository.save(user);
	}
}
