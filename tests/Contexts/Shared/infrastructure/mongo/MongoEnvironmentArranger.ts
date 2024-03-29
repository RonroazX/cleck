import { MongoClient } from 'mongodb';

import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class MongoEnvironmentArranger extends EnvironmentArranger {
	private readonly _client: Promise<MongoClient>;
	constructor(opts: { connectionManager: Promise<MongoClient> }) {
		super();
		this._client = opts.connectionManager;
	}

	public async arrange(): Promise<void> {
		await this.cleanDatabase();
	}

	public async close(): Promise<void> {
		return (await this.client()).close();
	}

	protected async cleanDatabase(): Promise<void> {
		const collections = await this.collections();
		const client = await this.client();

		for (const collection of collections) {
			client.db().collection(collection).deleteMany({});
		}
	}

	protected async client(): Promise<MongoClient> {
		return this._client;
	}

	private async collections(): Promise<string[]> {
		const client = await this.client();

		const collections = await client.db().listCollections(undefined, { nameOnly: true }).toArray();

		return collections.map(collection => collection.name);
	}
}
