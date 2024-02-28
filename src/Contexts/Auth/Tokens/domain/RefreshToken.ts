import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { ClientId } from '../../Shared/domain/Users/TokenId';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserIP } from '../../Shared/domain/Users/UserIP';
import { UserAgent } from '../../Users/domain/UserAgent';
import { JWT } from './JWT';

export interface RefreshTokenParams {
	isActive?: boolean;
	userAgent: UserAgent;
	dateAdd: Date;
	dateExp: Date;
  dateUpd: Date;
	userId: UserId;
	clientId: ClientId;
	userIP: UserIP;
	jwt: JWT;
}

export class RefreshToken extends AggregateRoot {
	readonly isActive: boolean;
	readonly userAgent: UserAgent;
	readonly dateAdd: Date;
  readonly dateUpd: Date;
	readonly dateExp: Date;
	readonly userId: UserId;
	readonly userIP: UserIP;
	readonly clientId: ClientId;
	readonly jwt: JWT;

	constructor({
		isActive = true,
		userAgent,
		dateAdd,
		dateExp,
    dateUpd,
		userId,
		clientId,
		userIP,
		jwt
	}: RefreshTokenParams) {
		super();
		this.isActive = isActive;
		this.userAgent = userAgent;
		this.dateAdd = dateAdd;
		this.dateExp = dateExp;
    this.dateUpd = dateUpd;
		this.userId = userId;
		this.clientId = clientId;
		this.jwt = jwt;
		this.userIP = userIP;
	}

	static fromPrimitives(plainData: {
		isActive: boolean;
		userAgent: {
			userAgent: string;
			userAgentType: string;
		};
		dateAdd: Date;
		dateExp: Date;
    dateUpd: Date;
		userId: string;
		clientId: string;
		userIP: string;
		jwt: string;
	}): RefreshToken {
		return new RefreshToken({
			isActive: plainData.isActive,
			userAgent: new UserAgent(plainData.userAgent.userAgent),
			dateAdd: plainData.dateAdd,
      dateUpd: plainData.dateUpd,
			dateExp: plainData.dateExp,
			jwt: new JWT(plainData.jwt),
			userId: new UserId(plainData.userId),
			clientId: new ClientId(plainData.clientId),
			userIP: new UserIP(plainData.userIP)
		});
	}

	toPrimitives(): {
		isActive: boolean;
		userAgent: {
			userAgent: string;
			userAgentType: string;
		};
		dateAdd: Date;
		dateExp: Date;
		userId: string;
		clientId: string;
		userIP: string;
		jwt: string;
	} {
		return {
			isActive: this.isActive,
			userAgent: {
				userAgent: this.userAgent.userAgent,
				userAgentType: this.userAgent.userAgentType
			},
			dateAdd: this.dateAdd,
			dateExp: this.dateExp,
			userId: this.userId.value,
			clientId: this.clientId.value,
			jwt: this.jwt.value,
			userIP: this.userIP.value
		};
	}
}
