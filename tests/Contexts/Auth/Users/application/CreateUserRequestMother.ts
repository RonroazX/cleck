import { UserCreatorRequest } from "../../../../../src/Contexts/Auth/Users/application/UserCreatorRequest";
import { UserEmail } from "../../../../../src/Contexts/Auth/Users/domain/UserEmail";
import { UserName } from "../../../../../src/Contexts/Auth/Users/domain/UserName";
import { UserPassword } from "../../../../../src/Contexts/Auth/Users/domain/UserPassword";
import { UserNameMother } from "../domain/UserNameMother";

export class CreateUserRequestMother {
  static create(username: UserName, password: UserPassword, email: UserEmail): UserCreatorRequest {
    return {email: email.value, password: password.value, username: username.value};
  }

  static random(): UserCreatorRequest {
    return this.create(
      UserNameMother.random(),

    );
  }

  static invalidRequest() {}
}
