declare namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
