import { HashUserPasswordService } from "../../../../../src/Contexts/Auth/Users/application/HashUserPassword";
import { UserHashedPassword } from "../../../../../src/Contexts/Auth/Users/domain/UserHashedPassword";
import { UserPassword } from "../../../../../src/Contexts/Auth/Users/domain/UserPassword";
import { PasswordMother } from "../../../Shared/domain/PasswordMother";

export class UserPasswordMother {
  static create(value: string): Promise<UserHashedPassword> {
    return UserPassword.hashUserPassword(value, new HashUserPasswordService());
  }


  static random(): Promise<UserHashedPassword> {
    return this.create(PasswordMother.random(15));
  }

  static invalidPassword(): string {
    return PasswordMother.random(5);
  }
}
