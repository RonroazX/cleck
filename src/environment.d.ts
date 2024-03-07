declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT?: string;
			ACCESS_TOKEN_SECRET: string;
			REFRESH_TOKEN_SECRET: string;
      ACCESSS_TOKEN_EXPIRATION: string;
      REFRESH_TOKEN_EXPIRATION: string;
		}
	}
}

export {};
