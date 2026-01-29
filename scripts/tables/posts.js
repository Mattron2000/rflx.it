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
		{ created_at: '2026-01-20 09:08:47', photo_name: 'image_01.png', user_nickname: 'Luigi', description: '#photo ecco una bella foto di un lago' },
		{ created_at: '2026-01-21 10:20:00', photo_name: 'image_02.png', user_nickname: 'Mario', description: '#coding sto programmando in JavaScript per la mia nuova app' },
		{ created_at: '2026-01-22 17:12:30', photo_name: 'image_03.png', user_nickname: 'Mario', description: '#game Elden Ring, inizio avventura' },
		{ created_at: '2026-01-23 15:30:00', photo_name: 'image_04.png', user_nickname: 'Luigi', description: '#film Amici miei, momenti prima del famoso scherzo alla stazione' },
		{ created_at: '2026-01-24 11:01:45', photo_name: 'image_05.png', user_nickname: 'Luigi', description: '#album mi piace questo album' },
		{ created_at: '2026-01-25 20:00:00', photo_name: 'image_06.png', user_nickname: 'Mario', description: '#film Mr Bean, molto divertente' }
	];

	let photoTable = [];

	const promises = datas.map(async (p) => {
		const imagePath = path.resolve(`${seedImagesPath}/${p.photo_name}`);

		const photo_name = generateFilename(p.photo_name);

		photoTable.push({ old: p.photo_name, new: photo_name });

		p.photo_name = photo_name;

		copyFile(imagePath, path.resolve(`${seedImagesDB}/${p.photo_name}`));

		await queryBuilder(name)
			.insert(p)
			.returning('*')
			.then((res) => res[0])
			.then((res) => log(`post seed: ${JSON.stringify(res)}`));
	});

	return Promise.all(promises)
		.then(() => {
			log('Posts seeded');
			return photoTable;
		})
		.catch((err) => log(err));
}

export default { seed };
