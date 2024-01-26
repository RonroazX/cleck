import { User } from "../../../../../src/Contexts/Auth/Users/domain/User";
import {UserRepository} from "../../../../../src/Contexts/Auth/Users/domain/UserRepository";

export class UserRepositoryMock implements UserRepository {
  private readonly mockSave = jest.fn();

  async save(user: User): Promise<void> {
    await this.mockSave(user);
  }

  assertSaveHaveBeenCalledWith(expected: User): void {
    expect(this.mockSave).toHaveBeenCalledWith(expected);
  }
}
