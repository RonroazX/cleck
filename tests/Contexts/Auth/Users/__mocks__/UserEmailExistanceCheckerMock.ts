import { UserEmailExistanceChecker } from '../../../../../src/Contexts/UserManagement/Users/application/UserEmailExistanceChecker';
import { UserEmail } from '../../../../../src/Contexts/UserManagement/Users/domain/UserEmail';
import { UserEmailAlreadyRegistered } from '../../../../../src/Contexts/UserManagement/Users/domain/UserEmailAlreadyRegistered';
import { UserRepository } from '../../../../../src/Contexts/UserManagement/Users/domain/UserRepository';

export class UserEmailExistanceCheckerMock extends UserEmailExistanceChecker {
	emailAlreadyRegistered: boolean;
	constructor(userRepository: { userRepository: UserRepository }) {
		super(userRepository);
		this.emailAlreadyRegistered = false;
	}

	public async run(userEmail: UserEmail): Promise<void> {
		if (this.emailAlreadyRegistered) {
			throw new UserEmailAlreadyRegistered(`The email <${userEmail.value} is already registered`);
		}

		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	public mockEmailAlreadyRegistered(): void {
		this.emailAlreadyRegistered = true;
	}
}
