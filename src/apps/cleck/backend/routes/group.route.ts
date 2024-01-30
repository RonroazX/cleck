import { Router, Request, Response, NextFunction } from "express";
import { validateJWT } from "../middlewares/authMiddleware";

export const register = (router: Router): void => {
  router.post('/group/create', validateJWT, (req: Request, res: Response, next: NextFunction) => { console.log('has creado un grupo')});
}
