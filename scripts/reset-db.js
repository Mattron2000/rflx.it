'use strict';

import { existsSync, unlinkSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

import env from '../src/config/env.js';
import { log } from '../src/logger.js';
import queryBuilder from '../src/db/queryBuilder.js';

// Delete DB if exists
if (existsSync(env.DB_PATH)) {
	unlinkSync(env.DB_PATH);
	log('Existing DB removed');
}

const queries = readFileSync(env.DB_SCHEMA_PATH, 'utf-8');

// Apply SQL schema (recreate the DB file)
for (const query of queries.split(';'))
	if (query.trim() === '') continue;
	else await queryBuilder.raw(query);

log('Schema created');

// Close DB
await queryBuilder.destroy();
log('DB reset completed successfully');

// Delete all images in public/images/posts/
const imagesDir = resolve('public/images/posts');

if (existsSync(imagesDir)) {
	readdirSync(imagesDir).forEach((file) => {
		const filePath = join(imagesDir, file);
		unlinkSync(filePath);
	});
	log('All images in public/images/posts/ deleted');
}
