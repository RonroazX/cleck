import { NextFunction, Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import { glob } from 'glob';
import httpStatus from 'http-status';
import path from 'path';

interface RouteModule {
	register: (router: Router) => void;
}

export function registerRoutes(router: Router): void {
	const routes = glob.sync(`${__dirname}/**/*.route.*`);
	routes.map(route => register(route, router));
}

function register(routePath: string, router: Router) {
	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const module = require(path.resolve(routePath)) as RouteModule;
	module.register(router);
}

export function validateSchema(req: Request, res: Response, next: NextFunction): void | Response {
	const validationErrors = validationResult(req);
	if (validationErrors.isEmpty()) {
		next();

		return;
	}

	return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
		errors: validationErrors.array()
	});
}
