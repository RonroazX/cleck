import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { TokenId } from "../../Shared/domain/Users/TokenId";
import { UserIP } from "../../Shared/domain/Users/UserIP";
import { UserId } from "../../Shared/domain/Users/UserId";
import { UserAgent } from "./UserAgent";

export interface RefreshTokenParams {
  isActive?: boolean;
  userAgent: UserAgent;
  dateAdd: Date;
  dateExp: Date;
  userId: UserId;
  tokenId: TokenId;
  userIP: UserIP;
  jwt: string;
}


export class RefreshToken extends AggregateRoot {
  readonly isActive: boolean;
  readonly userAgent: UserAgent;
  readonly dateAdd: Date;
  readonly dateExp: Date;
  readonly userId: UserId;
  readonly userIP: UserIP;
  readonly tokenId: TokenId;
  readonly jwt: string;

  constructor({isActive = true, userAgent, dateAdd, dateExp, userId, tokenId, userIP, jwt}: RefreshTokenParams) {
    super();
    this.isActive = isActive;
    this.userAgent = userAgent;
    this.dateAdd = dateAdd;
    this.dateExp = dateExp;
    this.userId = userId;
    this.tokenId = tokenId;
    this.jwt = jwt;
    this.userIP = userIP;
  }

  toPrimitives(): {
    isActive: boolean;
    userAgent: {
      userAgent: string;
      userAgentType: string;
    }
    dateAdd: Date;
    dateExp: Date;
    userId: string;
    tokenId: string;
  } {
    return {
      isActive: this.isActive,
      userAgent: {
        userAgent: this.userAgent.userAgent,
        userAgentType: this.userAgent.userAgentType,
      },
      dateAdd: this.dateAdd,
      dateExp: this.dateExp,
      userId: this.userId.value,
      tokenId: this.tokenId.value,
    }
  }
}
