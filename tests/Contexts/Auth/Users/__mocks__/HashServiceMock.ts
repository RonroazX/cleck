import { HashUserPasswordService } from '../../../../../src/Contexts/Auth/Users/application/HashUserPassword';

export class HashServiceMock implements HashUserPasswordService {
	async hash(password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			resolve(password);
		});
	}
}
