/* eslint-disable camelcase */
const common = [
	'--require-module ts-node/register' // Load TypeScript module
];

const cleck_backend = [
	...common,
	'tests/apps/Auth/backend/features/**/*.feature',
	'--require tests/apps/Auth/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
	cleck_backend
};
