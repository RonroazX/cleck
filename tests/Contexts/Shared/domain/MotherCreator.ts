import { faker } from '@faker-js/faker';

export class MotherCreator {
	static uuid(): string {
		return faker.string.uuid();
	}

	static word(length: number): string {
		return faker.lorem.word(length);
	}
}
