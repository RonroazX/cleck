import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { LoginPostController } from '../controllers/LoginPostController';
import { LogoutPostController } from '../controllers/LogoutPostController';
import { RefreshPostController } from '../controllers/RefreshPostController';
import { SignupPostController } from '../controllers/SignupPostController';
import container from '../dependency-injection/configureContainer';
import { validateSchema } from '.';

export const register = (router: Router): void => {
	const loginReqSchema = [
		body('email').isEmail().withMessage('email must be a email'),
		body('password').isString().withMessage('password must be a string')
	];

	const signupReqSchema = [
		body('username').isString().withMessage('username must be a string'),
		body('email').isEmail().withMessage('email must be a email'),
		body('password').isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minNumbers: 1,
			minUppercase: 1,
			minSymbols: 1
		})
	];

	const loginPostController = container.resolve<LoginPostController>('loginPostController');
	router.post(
		'/login',
		loginReqSchema,
		validateSchema,
		(req: Request, res: Response, next: NextFunction) => {
			loginPostController.run(req, res, next);
		}
	);

	const signupPostController = container.resolve<SignupPostController>('signupPostController');
	router.post(
		'/signup',
		signupReqSchema,
		validateSchema,
		(req: Request, res: Response, next: NextFunction) => {
			signupPostController.run(req, res, next);
		}
	);

	const refreshPostController = container.resolve<RefreshPostController>('refreshPostController');
	router.post('/refresh', validateSchema, (req: Request, res: Response, next: NextFunction) => {
		refreshPostController.run(req, res, next);
	});

	const logoutPostController = container.resolve<LogoutPostController>('logoutPostController');
	router.post('/logout', validateSchema, (req: Request, res: Response, next: NextFunction) => {
		logoutPostController.run(req, res, next);
	});
};
