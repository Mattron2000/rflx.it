'use strict';

import path from 'node:path';
import { copyFile } from 'node:fs/promises';

import { log } from '../../src/logger.js';
import { generateFilename } from '../../src/config/multer.js';
import queryBuilder from '../../src/db/queryBuilder.js';

const name = 'posts';

const seedImagesPath = 'scripts/images';
const seedImagesDB = 'public/images/posts';

function seed() {
	log(`Seeding ${name}...`);

	// prettier-ignore
	const datas = [
		{ photo_name: 'image_01.jpeg', user_nickname: 'Luigi', description: 'foto bella' }
	];

	const promises = datas.map(async (p) => {
		const imagePath = path.resolve(`${seedImagesPath}/${p.photo_name}`);

		p.photo_name = generateFilename(p.photo_name);

		copyFile(imagePath, path.resolve(`${seedImagesDB}/${p.photo_name}`));

		await queryBuilder(name)
			.insert(p)
			.returning('*')
			.then((res) => res[0])
			.then((res) => log(`post seed: ${JSON.stringify(res)}`));
	});

	return Promise.all(promises)
		.then(() => log('Posts seeded'))
		.catch((err) => log(err));
}

export default { seed };
