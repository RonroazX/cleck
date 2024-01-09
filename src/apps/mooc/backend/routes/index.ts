import { Router, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { glob } from 'glob';
import httpStatus from 'http-status';
import path from 'path';

export function registerRoutes(router: Router): void {
	const routes = glob.sync(`${__dirname}/**/*.route.*`);
	routes.map(route => register(route, router));
}

function register(routePath: string, router: Router) {
	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const { register } = require(path.resolve(routePath)) as { register: (router: Router) => void };
	register(router);

}

export function validateSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors.array().map((error: ValidationError) => ({ [error.type]: error.msg}));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors,
  });
}


