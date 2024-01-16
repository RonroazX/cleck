import { Collection, MongoClient, ObjectId } from 'mongodb';

import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';
import { Nullable } from '../../../../Shared/domain/Nullable';


interface CourseDocument {
  _id: string;
  name: string;
  duration: string;
}

export class MongoCourseRepository implements CourseRepository {
	private readonly _client: Promise<MongoClient>;
	constructor(opts: { connectionManager: Promise<MongoClient> }) {
		this._client = opts.connectionManager;
	}

	async save(course: Course): Promise<void> {
		return this.persist(course.id.value, course);
	}

	public async search(id: CourseId): Promise<Nullable<Course>> {
    const collection = await this.collection();

    const document = await collection.findOne<CourseDocument>({_id: new ObjectId(id.value)});

    return document ? Course.fromPrimitives({id: document._id, name: document.name, duration: document.duration}) : null;
  }

	public async persist(id: string, aggregateRoot: Course): Promise<void> {
		const collection = await this.collection();

    const objectId = new ObjectId(id);

    const document = {...aggregateRoot.toPrimitives(), _id: objectId, id: undefined};

    await collection.updateOne({_id: objectId}, { $set: document}, {upsert: true})
	}

	protected collectionName(): string {
		return 'courses';
	}

	private async collection(): Promise<Collection> {
		return (await this._client).db().collection(this.collectionName());
	}
}
