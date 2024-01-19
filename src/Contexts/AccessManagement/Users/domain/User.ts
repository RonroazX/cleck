import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { UserId } from "../../Shared/domain/Users/UserId";
import { UserEmail } from "./UserEmail";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

interface UserParams {
  id: UserId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
}

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;


  constructor({id, name, email, password}: UserParams) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toPrimitives(): {id: string, name: string, email: string, password: string} {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    }
  }
}
