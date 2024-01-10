import { Uuid } from '../../../Shared/domain/value-object/Uuid';

interface CourseParams {
	id: Uuid;
	name: string;
	duration: string;
}

export class Course {
	readonly id: Uuid;
	readonly name: string;
	readonly duration: string;

	constructor({ id, name, duration }: CourseParams) {
		this.id = id;
		this.name = name;
		this.duration = duration;
	}
}
