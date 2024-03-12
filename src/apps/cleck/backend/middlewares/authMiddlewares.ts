import { NextFunction, Response } from "express";
import { IAuthRequest } from "./authTypes";

export const clientInfo = (
  req: IAuthRequest,
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
