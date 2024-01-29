import { faker } from '@faker-js/faker';

export class MotherCreator {
	static uuid(): string {
		return faker.string.uuid();
	}

	static word(length: number): string {
		return faker.lorem.word(length);
	}

	static password(length: number): string {
		return faker.internet.password({ length, prefix: '$', pattern: /[A-Za-z0-9]/ });
	}

	static email(): string {
		return faker.internet.email();
	}
}
