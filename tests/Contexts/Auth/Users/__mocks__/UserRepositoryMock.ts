import { User } from '../../../../../src/Contexts/Auth/Users/domain/User';
import { UserEmail } from '../../../../../src/Contexts/Auth/Users/domain/UserEmail';
import { UserRepository } from '../../../../../src/Contexts/Auth/Users/domain/UserRepository';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';

export class UserRepositoryMock implements UserRepository {
	private readonly mockSave = jest.fn();

	async searchUserByEmail(email: UserEmail): Promise<Nullable<User>> {
		return Promise.resolve(null);
	}

  searchUserByToken(token: string): Promise<Nullable<User>> {
    return Promise.resolve(null);
  }

	async save(user: User): Promise<void> {
		await this.mockSave(user);
	}

	assertSaveHaveBeenCalledWith(expected: User): void {
		expect(this.mockSave).toHaveBeenCalledWith(expected);
	}
}
