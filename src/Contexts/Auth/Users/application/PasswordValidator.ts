import { UserHashedPassword } from "../domain/UserHashedPassword";
import * as bcrypt from 'bcrypt';

export class PasswordValidator {
  async validate(password: string, hashedPassword: UserHashedPassword): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword.value);
  }
}
