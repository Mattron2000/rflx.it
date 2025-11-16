import fs from 'node:fs';
import env from '../src/config/env.js';
import { log } from '../src/logger.js';
import queryBuilder from '../src/db/queryBuilder.js';

// Delete DB if exists
if (fs.existsSync(env.DB_PATH)) {
	fs.unlinkSync(env.DB_PATH);
	log('Existing DB removed');
}

// Apply SQL schema (recreate automatically the DB file)
await queryBuilder.raw(fs.readFileSync(env.DB_SCHEMA_PATH, 'utf-8'));
log('Schema created');

// Close DB
await queryBuilder.destroy();
log('DB reset completed successfully');
