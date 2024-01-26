import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserEmail extends StringValueObject {
	constructor(value: string) {
		super(value.toLocaleLowerCase());
		this.ensureIsValidEmail(value);
	}

	private ensureIsValidEmail(email: string) {
		if (!this.validate(email)) {
			throw new InvalidArgumentError(
				`<${this.constructor.name}> does not allow the value <${email}>`
			);
		}
	}

	private validate(email: string): boolean {
		if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
			return true;
		}

		return false;
	}
}
