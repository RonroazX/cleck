import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseDuration } from './CourseDuration';
import { CourseName } from './CourseName';

interface CourseParams {
	id: CourseId;
	name: CourseName;
	duration: CourseDuration;
}

export class Course extends AggregateRoot {
	readonly id: CourseId;
	readonly name: CourseName;
	readonly duration: CourseDuration;

	constructor({ id, name, duration }: CourseParams) {
		super();
		this.id = id;
		this.name = name;
		this.duration = duration;
	}

	static fromPrimitives(plainData: { id: string; name: string; duration: string }): Course {
		return new Course({
			id: new CourseId(plainData.id),
			name: new CourseName(plainData.name),
			duration: new CourseDuration(plainData.duration)
		});
	}

	toPrimitives(): { id: string; name: string; duration: string } {
		return {
			id: this.id.value,
			name: this.name.value,
			duration: this.duration.value
		};
	}
}
