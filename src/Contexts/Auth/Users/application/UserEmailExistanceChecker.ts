import { UserEmail } from "../domain/UserEmail";
import { UserEmailAlreadyRegistered } from "../domain/UserEmailAlreadyRegistered";
import { UserRepository } from "../domain/UserRepository";

export class UserEmailExistanceChecker {
  private readonly userRepository: UserRepository;
  constructor(opts: {userRepository: UserRepository}) {
    this.userRepository = opts.userRepository;
  }

  public async run(userEmail: UserEmail) {
    const user = await this.userRepository.searchUserByEmail(userEmail);
    if (user) throw new UserEmailAlreadyRegistered(`The email <${userEmail}> is already registered`);
  }
}
