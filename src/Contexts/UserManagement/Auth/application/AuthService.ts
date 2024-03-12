import { IClientInfo, IUserInfo } from "../../../../apps/cleck/backend/middlewares/authTypes";
import { UserValidator } from "../../Users/application/UserValidator";

export class AuthService {
  private readonly userValidatorService: UserValidator;
  constructor(opts: {userValidator: UserValidator}) {
    this.userValidatorService = opts.userValidator;
  }

  async login(userData: IUserInfo, clientData: IClientInfo) {

    const {password, email} = userData;

    const user = await this.userValidatorService.run({password, email});

    if (clientData.id)

    return {}
  }

  async register(userData: IUserInfo) {

  }
}
