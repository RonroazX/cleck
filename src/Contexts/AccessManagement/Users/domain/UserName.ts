import { InvalidArgumentError } from "../../../Shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../../Shared/domain/value-object/StringValueObject";
import AMConstants from "../../Shared/utils/constants";

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUserName(value);
  }

  private ensureIsValidUserName(username: string) {
    if (!this.validate(username)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${username}>`);
    }
  }

  private validate(username: string): boolean {
    const usernameRegex = new RegExp(`^(?=.{${AMConstants.MIN_USERNAME_LENGTH},${AMConstants.MAX_USERNAME_LENGTH}}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$`);
    if (username.match(usernameRegex)) {
      return true;
    }
    return false;
  }
}
