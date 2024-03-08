import { NextFunction, Request, Response } from "express";

export interface IClientInfo {
  id?: string;
  host?: string;
  agent: string;
  refreshToken?: string;
}

export type AuthRequest = Request & {
  client?: IClientInfo;
}

export const clientInfo = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  req.client = {
    id: (req.query['client-id'] as string),
    host: req.headers.forwarded || req.socket.remoteAddress,
    agent: req.headers['user-agent'] as string,
    refreshToken: req.cookies['refreshToken'],
  };
  next();
}
