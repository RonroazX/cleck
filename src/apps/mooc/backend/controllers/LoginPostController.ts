import { Request, Response } from "express";
import { Controller } from "./Controller";
import httpStatus from "http-status";

type LoginPostRequest = Request & {
  body: {
    email: string;
    password: string;
  }
}


export class LoginPostController implements Controller {
  async run(req: LoginPostRequest, res: Response): Promise<void> {
    res.status(httpStatus.OK).send();
  }
}
