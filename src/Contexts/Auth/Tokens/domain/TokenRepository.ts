import { Nullable } from '../../../Shared/domain/Nullable';
import { RefreshToken } from './RefreshToken';

export interface TokenRepository {
	save(token: RefreshToken): Promise<void>;

	revokeTokensByUserId(userId: string): Promise<void>;

	revokeTokenByRefreshToken(refreshToken: string): Promise<void>;

	searchTokenByRefreshToken(refreshToken: string): Promise<Nullable<RefreshToken>>;

	searchTokenByClientId(clientId: string): Promise<Nullable<RefreshToken>>;

	updateToken(tokenId: string, newRefreshToken: string, dateUpd: Date): Promise<void>;
}
