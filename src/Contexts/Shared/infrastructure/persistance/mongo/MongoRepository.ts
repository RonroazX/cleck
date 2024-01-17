import { Collection, MongoClient, ObjectId } from 'mongodb';

import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class MongoRepository<T extends AggregateRoot> {
	private readonly _client: Promise<MongoClient>;
	constructor(opts: { connectionManager: Promise<MongoClient> }) {
		this._client = opts.connectionManager;
	}

	protected abstract collectionName(): string;

	protected async collection(): Promise<Collection> {
		return (await this._client).db().collection(this.collectionName());
	}

	protected async persist(id: string, aggregateRoot: T): Promise<void> {
		const collection = await this.collection();

		const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };

		await collection.updateOne(
			{ _id: id as unknown as ObjectId },
			{ $set: document },
			{ upsert: true }
		);
	}
}
