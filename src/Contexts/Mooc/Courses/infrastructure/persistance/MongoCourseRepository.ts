import { Collection, MongoClient } from 'mongodb';

import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';

export class MongoCourseRepository implements CourseRepository {
	private readonly _client: Promise<MongoClient>;
	constructor(opts: { connectionManager: Promise<MongoClient> }) {
		this._client = opts.connectionManager;
	}

	async save(course: Course): Promise<void> {
		//console.log(this._client);
		return this.persist(course.id.value, course);
	}

	public async search(id: CourseId): Promise<void> {}

	public async persist(id: string, aggregateRoot: Course): Promise<void> {
		await this.collection();
	}

	protected collectionName(): string {
		return 'courses';
	}

	private async collection(): Promise<Collection> {
		return (await this._client).db().collection(this.collectionName());
	}
}
