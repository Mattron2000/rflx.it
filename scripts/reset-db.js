'use strict';

import fs from 'node:fs';
import env from '../src/config/env.js';
import { log } from '../src/logger.js';
import queryBuilder from '../src/db/queryBuilder.js';

// Delete DB if exists
if (fs.existsSync(env.DB_PATH)) {
	fs.unlinkSync(env.DB_PATH);
	log('Existing DB removed');
}

const queries = fs.readFileSync(env.DB_SCHEMA_PATH, 'utf-8');

// Apply SQL schema (recreate the DB file)
for (const query of queries.split(';'))
	if (query.trim() === '') continue;
	else await queryBuilder.raw(query);

log('Schema created');

// Close DB
await queryBuilder.destroy();
log('DB reset completed successfully');
