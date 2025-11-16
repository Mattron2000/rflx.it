import morgan from 'morgan';

import env, { ENV_TYPE } from './config/env.js';

/**
 * Returns a logging middleware in development mode.
 * In production, returns a no-op middleware.
 *
 * @returns {Function} Express-compatible middleware function.
 */
export default () =>
	env.NODE_ENV === ENV_TYPE.DEVELOPMENT ? morgan('dev') : () => {};

/**
 * Logs messages to the console only in development mode.
 * Automatically extracts and displays the filename of the caller.
 *
 * @param {...any} args - Values to log to the console.
 * @returns {void}
 */
export function log(...args) {
	if (env.NODE_ENV !== ENV_TYPE.DEVELOPMENT) return;

	const stack = new Error().stack.split('\n')[2];

	const filepath =
		stack.match(/[-\w]+.\w+(:\d+){2}$/)?.[0]
		|| stack.match(/[-\w]+.\w+(:\d+){2}\)$/)?.[0];

	const filename = filepath.split(':')[0].split('?')[0];

	console.log(`[${filename}]`, ...args);
}
