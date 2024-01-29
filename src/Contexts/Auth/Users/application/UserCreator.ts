import { v4 as uuidv4 } from 'uuid';

import { UserId } from '../../Shared/domain/Users/UserId';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserRepository } from '../domain/UserRepository';
import { HashUserPasswordService } from './HashUserPassword';
import { UserCreatorRequest } from './UserCreatorRequest';

export class UserCreator {
	private readonly userRepository: UserRepository;
	private readonly hashService: HashUserPasswordService;
	constructor(opts: { userRepository: UserRepository; hashService: HashUserPasswordService }) {
		this.userRepository = opts.userRepository;
		this.hashService = opts.hashService;
	}

	async run(request: UserCreatorRequest): Promise<void> {
		const { id, email, password, username } = request;
		const hashedPassword = await UserPassword.hashUserPassword(password, this.hashService);
		const user = new User({
			id: new UserId(id ?? uuidv4()),
			email: new UserEmail(email),
			username: new UserName(username),
			password: hashedPassword
		});

		await this.userRepository.save(user);
	}
}
