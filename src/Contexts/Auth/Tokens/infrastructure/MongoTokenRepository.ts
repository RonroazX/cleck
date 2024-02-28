import { Nullable } from '../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../Shared/infrastructure/persistance/mongo/MongoRepository';
import { RefreshToken } from '../domain/RefreshToken';
import { TokenRepository } from '../domain/TokenRepository';

interface RefreshTokenDocument {
	_id: string;
	dateAdd: Date;
	dateExp: Date;
	isActive: boolean;
	jwt: string;
	tokenId: string;
	userId: string;
	userIP: string;
	userAgent: {
		userAgent: string;
		userAgentType: string;
	};
}

export class MongoTokenRepository extends MongoRepository<RefreshToken> implements TokenRepository {
	async revokeTokenByRefreshToken(refreshToken: string): Promise<void> {
		const collection = await this.collection();
		await collection.updateOne({ jwt: refreshToken }, { $set: { isActive: false } });
	}

	async revokeTokensByUserId(userId: string): Promise<void> {
		const collection = await this.collection();
		await collection.updateMany({ userId }, { $set: { isActive: false } });
	}

	async save(token: RefreshToken): Promise<void> {
		await this.persist(token.tokenId.value, token);
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
					tokenId: refreshTokenDocument.tokenId,
					userId: refreshTokenDocument.userId,
					userIP: refreshTokenDocument.userIP,
					userAgent: refreshTokenDocument.userAgent
				})
			: null;
	}

	protected collectionName(): string {
		return 'refreshTokens';
	}
}
