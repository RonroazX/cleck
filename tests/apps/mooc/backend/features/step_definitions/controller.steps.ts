import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';

import { MoocBackendApp } from '../../../../../../src/apps/mooc/backend/MoocBackendApp';
import { App } from 'supertest/types';

let _request: request.Test;
let application: MoocBackendApp;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
	_request = request(application.httpServer as App).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
	_response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
	_request = request(application.httpServer as App)
		.put(route)
		.send(JSON.parse(body) as object);
});

Then('the response should be empty', () => {
	assert.deepStrictEqual(_response.body, {});
});

BeforeAll(async () => {
	application = new MoocBackendApp();
	await application.start();
});

AfterAll(async () => {
	await application.stop();
});
