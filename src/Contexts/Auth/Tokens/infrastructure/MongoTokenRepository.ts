import { Nullable } from '../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../Shared/infrastructure/persistance/mongo/MongoRepository';
import { RefreshToken } from '../domain/RefreshToken';
import { TokenRepository } from '../domain/TokenRepository';

interface RefreshTokenDocument {
	_id: string;
	dateAdd: Date;
	dateExp: Date;
  dateUpd: Date;
	isActive: boolean;
	jwt: string;
	clientId: string;
	userId: string;
	userIP: string;
	userAgent: {
		userAgent: string;
		userAgentType: string;
	};
}

export class MongoTokenRepository extends MongoRepository<RefreshToken> implements TokenRepository {
  async updateToken(refreshToken: string, newRefreshToken: string, dateUpd: Date): Promise<void> {
    const collection = await this.collection();
		await collection.updateOne({ jwt: refreshToken }, { $set: { jwt: newRefreshToken, dateUpd:  dateUpd} });
  }

	async revokeTokenByRefreshToken(refreshToken: string): Promise<void> {
		const collection = await this.collection();
		await collection.updateOne({ jwt: refreshToken }, { $set: { isActive: false } });
	}

	async revokeTokensByUserId(userId: string): Promise<void> {
		const collection = await this.collection();
		await collection.updateMany({ userId }, { $set: { isActive: false } });
	}

	async save(token: RefreshToken): Promise<void> {
		await this.persist(token.clientId.value, token);
	}

	async searchTokenByRefreshToken(refreshToken: string): Promise<Nullable<RefreshToken>> {
		const collection = await this.collection();
		const refreshTokenDocument = await collection.findOne<RefreshTokenDocument>({
			jwt: refreshToken,
			isActive: true
		});

		return refreshTokenDocument
			? RefreshToken.fromPrimitives({
        dateAdd: refreshTokenDocument.dateAdd,
        dateExp: refreshTokenDocument.dateExp,
        isActive: refreshTokenDocument.isActive,
        jwt: refreshTokenDocument.jwt,
        clientId: refreshTokenDocument.clientId,
        userId: refreshTokenDocument.userId,
        userIP: refreshTokenDocument.userIP,
        userAgent: refreshTokenDocument.userAgent,
        dateUpd: refreshTokenDocument.dateUpd,
      })
			: null;
	}

	protected collectionName(): string {
		return 'refreshTokens';
	}
}
