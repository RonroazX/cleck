import { MongoClient } from 'mongodb';

import { MongoClientFactory } from '../../../../../src/Contexts/Shared/infrastructure/persistance/mongo/MongoClientFactory';

describe('MongoClientFactory', () => {
	const factory = MongoClientFactory;
	let client: MongoClient;

	beforeEach(async () => {
		client = await factory.createClient('test', {
			url: 'mongodb://localhost:28017/mooc-backend-test1'
		});
	});

	afterEach(async () => {
		await client.close();
	});

	it('creates a new client if it does not exist a client with the given name', async () => {
		const newClient = await factory.createClient('test2', {
			url: 'mongodb://localhost:28017/mooc-backend-test2'
		});

		expect(newClient).not.toBe(client);

		await newClient.close();
	});

	it('returns a client if it already exists', async () => {
		const newClient = await factory.createClient('test', {
			url: 'mongodb://localhost:28017/mooc-backend-test3'
		});

		expect(newClient).toBe(client);

		await newClient.close();
	});
});
