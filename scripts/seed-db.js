'use strict';

import fs from 'node:fs';

import env from '../src/config/env.js';
import { log } from '../src/logger.js';

import queryBuilder from '../src/db/queryBuilder.js';

import roles from './tables/roles.js';
import users from './tables/users.js';

// check DB if exist
if (!fs.existsSync(env.DB_PATH)) {
	throw new Error(`DB file not exist in "${env.DB_PATH}"`);
}

// Seeding
await Promise.all([roles.seed()]);
await Promise.all([users.seed()]); // deps: roles

// Close DB
await queryBuilder.destroy();
log('DB seeded');
