import { Nullable } from '../../../Shared/domain/Nullable';
import { RefreshToken } from '../domain/RefreshToken';
import { TokenRepository } from '../domain/TokenRepository';

export class RefreshTokenService {
	private readonly tokenRepository: TokenRepository;
	constructor(opts: { tokenRepository: TokenRepository }) {
		this.tokenRepository = opts.tokenRepository;
	}

	async saveRefreshToken(refreshToken: RefreshToken): Promise<void> {
		return this.tokenRepository.save(refreshToken);
	}

	async revokeTokensByUserId(userId: string): Promise<void> {
		return this.tokenRepository.revokeTokensByUserId(userId);
	}

	async revokeTokenByRefreshToken(refreshToken: string): Promise<void> {
		return this.tokenRepository.revokeTokenByRefreshToken(refreshToken);
	}

	async searchTokenByRefreshToken(refreshToken: string): Promise<Nullable<RefreshToken>> {
		return this.tokenRepository.searchTokenByRefreshToken(refreshToken);
	}

	async searchTokenByClientId(clientId: string): Promise<Nullable<RefreshToken>> {
		return this.tokenRepository.searchTokenByClientId(clientId);
	}

	async updateToken(tokenId: string, newRefreshToken: string, dateUpd: Date): Promise<void> {
		return this.tokenRepository.updateToken(tokenId, newRefreshToken, dateUpd);
	}
}
