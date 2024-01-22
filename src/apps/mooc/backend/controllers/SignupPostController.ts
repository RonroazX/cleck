import { Request, Response } from "express";
import { Controller } from "./Controller";
import httpStatus from "http-status";

type SignupPostRequest = Request & {
  body: {
    username: string;
    email: string;
    password: string;
  }
}

export class SignupPostController implements Controller {
  async run(req: SignupPostRequest, res: Response): Promise<void> {
    res.status(httpStatus.CREATED).send();
  }
}
