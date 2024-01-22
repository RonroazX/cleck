import { InvalidArgumentError } from "../../../Shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../../Shared/domain/value-object/StringValueObject";
import AMConstants from "../../Shared/utils/constants";

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsAValidPassword(value);
  }

  private ensureIsAValidPassword(value: string) {
    if (!this.validate(value)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
    }
  }

  private validate(password: string): boolean {
    const passwordRegex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${AMConstants.MIN_PASSWORD_LENGTH},}$`)
    if (password.match(passwordRegex) && password.length < AMConstants.MAX_PASSWORD_LENGTH) {
      return true;
    }
    return false
  }
}
