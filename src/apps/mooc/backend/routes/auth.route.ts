import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import container from '../dependency-injection/configureContainer';
import { validateSchema } from '.';
import { LoginPostController } from '../controllers/LoginPostController';
import { SignupPostController } from '../controllers/SignupPostController';

export const register = (router: Router): void => {
	const loginReqSchema = [
		body('email').isEmail().withMessage('email must be a email'),
		body('password').isString().withMessage('password must be a string'),
	];

  const signupReqSchema = [
    body('username').isString().withMessage('username must be a string'),
		body('email').isEmail().withMessage('email must be a email'),
		body('password').isString().withMessage('password must be a string'),
	];


	const loginPostController = container.resolve<LoginPostController>('loginPostController');
	router.post('/login', loginReqSchema, validateSchema, (req: Request, res: Response) => {
		loginPostController.run(req, res);
	});

  const signupPostController = container.resolve<SignupPostController>('signupPostController');
	router.post('/signup', signupReqSchema, validateSchema, (req: Request, res: Response) => {
		signupPostController.run(req, res);
	});
};
