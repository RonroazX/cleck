import bcrypt from 'bcrypt';

export class HashUserPasswordService {
	async hash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	}
}
