import dotenv from 'dotenv';

import { CleckBackendApp } from './CleckBackendApp';

try {
	dotenv.config();
	new CleckBackendApp().start();
} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log('uncaughtException', err);
	process.exit(1);
});
