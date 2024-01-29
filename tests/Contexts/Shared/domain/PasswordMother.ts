import { MotherCreator } from './MotherCreator';

export class PasswordMother {
	static random(length: number): string {
		return MotherCreator.password(length);
	}
}
