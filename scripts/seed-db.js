import fs from 'node:fs';
import env from '../src/config/env.js';
import { log } from '../src/logger.js';
import queryBuilder from '../src/db/queryBuilder.js';
import seedRoles from './tables/roles.js';
import seedUsers from './tables/users.js';
import seedPhotos from "./tables/photos.js";

// check DB if exist
if (!fs.existsSync(env.DB_PATH)) {
	log(`DB file not exist in "${env.DB_PATH}"`);
	throw new Error(`DB file not exist in "${env.DB_PATH}"`);
}

// Seeding
await Promise.all([seedRoles()]);
await Promise.all([seedUsers()]);		// deps: roles
await Promise.all([seedPhotos()]);	// deps: users

// Close DB
await queryBuilder.destroy();
log('DB seeded');
