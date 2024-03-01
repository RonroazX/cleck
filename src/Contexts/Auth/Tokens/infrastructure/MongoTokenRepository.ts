import { ObjectId } from 'bson';
import { Nullable } from '../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../Shared/infrastructure/persistance/mongo/MongoRepository';
import { RefreshToken } from '../domain/RefreshToken';
import { TokenRepository } from '../domain/TokenRepository';

interface TokenDocument {
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
  async updateToken(tokenId: string, newRefreshToken: string, dateUpd: Date): Promise<void> {
    const collection = await this.collection();
		await collection.updateOne({ _id: tokenId as unknown as ObjectId}, { $set: { jwt: newRefreshToken, dateUpd:  dateUpd} }).then((value) => console.log('los modificados son: ', value.modifiedCount));
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
		const tokenDocument = await collection.findOne<TokenDocument>({
			jwt: refreshToken,
			isActive: true
		});

		return tokenDocument
			? RefreshToken.fromPrimitives({
        dateAdd: tokenDocument.dateAdd,
        dateExp: tokenDocument.dateExp,
        isActive: tokenDocument.isActive,
        jwt: tokenDocument.jwt,
        clientId: tokenDocument.clientId,
        userId: tokenDocument.userId,
        userIP: tokenDocument.userIP,
        userAgent: tokenDocument.userAgent,
        dateUpd: tokenDocument.dateUpd,
      })
			: null;
	}

  async searchTokenByClientId(clientId: string): Promise<Nullable<RefreshToken>> {
    const collection = await this.collection();
    const tokenDocument = await collection.findOne<TokenDocument>({
      clientId: clientId
    });

    return tokenDocument ? RefreshToken.fromPrimitives({
      dateAdd: tokenDocument.dateAdd,
      dateExp: tokenDocument.dateExp,
      isActive: tokenDocument.isActive,
      jwt: tokenDocument.jwt,
      clientId: tokenDocument.clientId,
      userId: tokenDocument.userId,
      userIP: tokenDocument.userIP,
      userAgent: tokenDocument.userAgent,
      dateUpd: tokenDocument.dateUpd,
    }) : null;
  }

	protected collectionName(): string {
		return 'refreshTokens';
	}
}
