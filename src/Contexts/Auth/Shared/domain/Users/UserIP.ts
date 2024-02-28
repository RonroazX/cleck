import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject';

export class UserIP extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureIsAValidIp(value);
	}

	private validate(ip: string) {
		const ipRegex = new RegExp('\\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\\.|$)){4}\\b');
		if (ip.match(ipRegex)) {
			return true;
		}

		return false;
	}

	private ensureIsAValidIp(ip: string) {
		if (!this.validate(ip)) {
			throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${ip}>`);
		}
	}
}
