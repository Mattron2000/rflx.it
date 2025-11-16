import fs from 'node:fs';
import env from '../src/config/env.js';
import { log } from '../src/logger.js';
import seedUsers from './tables/users.js';
import queryBuilder from '../src/db/queryBuilder.js';

// check DB if exist
if (!fs.existsSync(env.DB_PATH)) {
	log(`DB file not exist in "${env.DB_PATH}"`);
	throw new Error(`DB file not exist in "${env.DB_PATH}"`);
}

// Seeding
await Promise.all([seedUsers()]);

// Close DB
await queryBuilder.destroy();
log('DB seeded');
