import { Request } from 'express';

export interface IClientInfo {
  id?: string;
  host?: string;
  agent: string;
  refreshToken?: string;
}

export interface IUserInfo {
  id: string;
	email: string;
	username: string;
	password: string;
}

export type IAuthRequest = Request & {
  client?: IClientInfo;
};

export type IAuthenticatedRquest = IAuthRequest & {
  user: IUserInfo | undefined;
};
