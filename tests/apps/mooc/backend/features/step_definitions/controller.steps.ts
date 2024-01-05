import 'reflect-metadata';
import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';
import { MoocBackendApp } from '../../../../../../src/apps/mooc/backend/MoocBackendApp';

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

Given('I send a PUT request to {string} with body:', async (route: string, body: string) => {
  if (!application.httpServer) {
    throw new Error('Express app is not initialized');
  }
	_request = request(application.httpServer)
		.put(route)
		.send(JSON.parse(body) as object);
});

Then('the response should be empty', () => {
	assert.deepStrictEqual(_response.body, {});
});

BeforeAll(async () => {
	application = new MoocBackendApp();
	await application.start();
  await new Promise(resolve => setTimeout(resolve, 1000));
});

AfterAll(async () => {
	await application.stop();
});
