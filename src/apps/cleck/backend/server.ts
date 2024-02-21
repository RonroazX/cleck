import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';

import { ConflictError } from '../../../Contexts/Shared/infrastructure/Errors/ConflictError';
import { ForbiddenError } from '../../../Contexts/Shared/infrastructure/Errors/ForbiddenError';
import { UnauthorizedError } from '../../../Contexts/Shared/infrastructure/Errors/UnauthorizedError';
import { registerRoutes } from './routes';
import { UserNotFound } from '../../../Contexts/Auth/Users/domain/UserNotFound';

export class Server {
	private readonly express: express.Express;
	private readonly port: string;
	private httpServer?: http.Server;

	constructor(port: string) {
		this.port = port;
		this.express = express();
		this.express.use(json());
		this.express.use(cookieParser());
		/*
    this.express.use(cors({
      origin: ['http://127.0.0.1:5500', 'https://localhost:5000']
    }))
    */
		this.express.use(urlencoded({ extended: true }));
		this.express.use(helmet.xssFilter());
		this.express.use(helmet.noSniff());
		this.express.use(helmet.hidePoweredBy());
		this.express.use(helmet.frameguard({ action: 'deny' }));
		this.express.use(compress());
		const router = Router();
		router.use(errorHandler());
		this.express.use(router);
		registerRoutes(router);

		router.use((err: Error, req: Request, res: Response, _next: () => void) => {
			if (err instanceof UnauthorizedError || err instanceof UserNotFound) {
				return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
			}
			if (err instanceof ConflictError) {
				return res.status(httpStatus.CONFLICT).send({ message: err.message });
			}
			if (err instanceof ForbiddenError) {
				return res.status(httpStatus.FORBIDDEN).send({ message: err.message });
			}
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
		});
	}

	async listen(): Promise<void> {
		return new Promise(resolve => {
			const env = this.express.get('env') as string;
			this.httpServer = this.express.listen(this.port, () => {
				console.log(
					`  Mock Backend App is running at http://localhost:${this.port} in ${env} mode`
				);
				console.log('  Press CTRL-C to stop\n');
				resolve();
			});
		});
	}

	getHTTPServer(): Server['httpServer'] {
		return this.httpServer;
	}

	getExpressApp(): Server['express'] {
		return this.express;
	}

	async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close(error => {
					if (error) {
						reject(error);

						return;
					}

					resolve();
				});
			}

			resolve();
		});
	}
}
