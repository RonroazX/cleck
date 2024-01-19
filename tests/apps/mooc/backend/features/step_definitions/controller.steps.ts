import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';

import container from '../../../../../../src/apps/mooc/backend/dependency-injection/configureContainer';
import { MoocBackendApp } from '../../../../../../src/apps/mooc/backend/MoocBackendApp';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let application: MoocBackendApp;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
	if (!application.httpServer) {
		throw new Error('Express app is not initialized');
	}
	_request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
	_response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
	if (!application.httpServer) {
		throw new Error('Express app is not initialized');
	}
	_request = request(application.httpServer)
		.put(route)
		.send(JSON.parse(body) as Record<string, unknown>);
});

Then('the response should be empty', () => {
	assert.deepStrictEqual(_response.body, {});
});

BeforeAll(async () => {
	application = new MoocBackendApp();
	await application.start();
});

AfterAll(async () => {
	await (await container.resolve<Promise<EnvironmentArranger>>('environmentArranger')).close();
	await application.stop();
});
