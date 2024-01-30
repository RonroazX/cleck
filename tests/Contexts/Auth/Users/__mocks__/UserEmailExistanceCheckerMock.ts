import { UserEmailExistanceChecker } from "../../../../../src/Contexts/Auth/Users/application/UserEmailExistanceChecker";
import { UserEmail } from "../../../../../src/Contexts/Auth/Users/domain/UserEmail";
import { UserEmailAlreadyRegistered } from "../../../../../src/Contexts/Auth/Users/domain/UserEmailAlreadyRegistered";
import { UserRepository } from "../../../../../src/Contexts/Auth/Users/domain/UserRepository";

export class UserEmailExistanceCheckerMock extends UserEmailExistanceChecker {
  emailAlreadyRegistered: boolean;
  constructor(userRepository: {userRepository: UserRepository}) {
    super(userRepository);
    this.emailAlreadyRegistered = false;
  }
  public run(userEmail: UserEmail): Promise<void> {
    if (this.emailAlreadyRegistered) {
      throw new UserEmailAlreadyRegistered(`The email <${userEmail.value} is already registered`);
    }
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  public mockEmailAlreadyRegistered() {
    this.emailAlreadyRegistered = true;
  }
}
