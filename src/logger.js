import env, { ENV_TYPE } from './config/env.js';

export function log(...args) {
	if (env.NODE_ENV !== ENV_TYPE.DEVELOPMENT) return;

	const stack = new Error().stack.split('\n')[2];

	const filepath = stack.match(/[-\w]+.\w+(:\d+){2}$/)?.[0];

	const filename = filepath.split(':')[0].split('?')[0];

	console.log(`[${filename}]`, ...args);
}
