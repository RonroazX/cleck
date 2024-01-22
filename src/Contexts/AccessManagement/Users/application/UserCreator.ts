import { User } from "../domain/User";
import { UserCreatorRequest } from "./UserCreatorRequest";

export class UserCreator {
  async run(request: UserCreatorRequest): Promise<void> {
    const {username, email, password} = request;

    const user = new User(

    )
  }
}
