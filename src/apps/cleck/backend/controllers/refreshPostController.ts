import { NextFunction, Response, Request } from 'express';
import { Controller } from './Controller';
import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';


export class RefreshPostController implements Controller {
	private readonly jwtService: JWTService;
	constructor(opts: { jwtService: JWTService }) {
		this.jwtService = opts.jwtService;
	}

	async run(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

      const decoded = req.body.user;
      const payload = { id: decoded.id, username: decoded.username };

      const accessToken = this.jwtService.signAccessToken(payload);

			res
				.header('Authorization', accessToken)
				.send(decoded);
		} catch (e) {
			next(e);
		}
	}
}
