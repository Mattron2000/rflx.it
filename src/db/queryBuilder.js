import knex from 'knex';
import env, { ENV_TYPE } from '../config/env.js';

export default knex({
	client: 'better-sqlite3',
	connection: { filename: env.DB_PATH },
	useNullAsDefault: true,
	options: {
		fileMustExist: true,
		verbose: env.NODE_ENV === ENV_TYPE.DEVELOPMENT
	}
});
