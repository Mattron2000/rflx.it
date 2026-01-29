'use strict';

import { log } from '../../src/logger.js';
import queryBuilder from '../../src/db/queryBuilder.js';

const name = 'comments';

async function seed(result) {
	log(`Seeding ${name}...`);

	result = result[0];

	// prettier-ignore
	let datas = [
		{ created_at: '2026-01-28 09:08:42', post_id: 'image_01.png', user_nickname: 'Mario', comment: 'proprio bella, dove si trova il lago?' },
		{ created_at: '2026-01-28 09:08:43', post_id: 'image_02.png', user_nickname: 'Luigi', comment: 'Cavolo è complicato per me' },
		{ created_at: '2026-01-28 09:08:44', post_id: 'image_02.png', user_nickname: 'Waluigi', comment: 'Cavolo devi essere molto bravo a scrivere tutto questo' },
		{ created_at: '2026-01-28 09:08:45', post_id: 'image_03.png', user_nickname: 'Wario', comment: 'GIT GUD' },
		{ created_at: '2026-01-28 09:08:46', post_id: 'image_03.png', user_nickname: 'Waluigi', comment: 'GIT GUD' },
		{ created_at: '2026-01-28 09:08:47', post_id: 'image_03.png', user_nickname: 'Luigi', comment: 'GIT GUD' },
		{ created_at: '2026-01-28 09:08:48', post_id: 'image_05.png', user_nickname: 'Waluigi', comment: 'bellissimo album' },
		{ created_at: '2026-01-28 09:08:49', post_id: 'image_06.png', user_nickname: 'Wario', comment: 'questo film mi fa spanzare dalle risate' }
	];

	datas.map(
		(p) => (p.post_id = result.find((post) => post.old === p.post_id).new)
	);

	const promises = datas.map(async (p) => {
		await queryBuilder(name)
			.insert(p)
			.returning('*')
			.then((res) => res[0])
			.then((res) => log(`comment seed: ${JSON.stringify(res)}`));
	});

	return Promise.all(promises)
		.then(() => log('Comments seeded'))
		.catch((err) => log(err));
}

export default { seed };
