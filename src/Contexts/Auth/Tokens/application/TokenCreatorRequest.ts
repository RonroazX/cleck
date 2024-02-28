export interface TokenCreatorRequest {
	isActive: boolean;
	userAgent: string;
	userId: string;
	userIP: string;
	jwt: string;
}
