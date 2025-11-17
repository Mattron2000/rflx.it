import session from 'express-session';
import knexConstructor from 'knex';
import { ConnectSessionKnexStore } from 'connect-session-knex';

import env from './env.js';
import { knexSessionConfig } from '../db/queryBuilder.js';

export default () => session({
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: false,
		maxAge: 1000 * 60 * 60 * 24 // 1 day
	},
	store: new ConnectSessionKnexStore({
		knex: knexConstructor(knexSessionConfig)
	})
});
