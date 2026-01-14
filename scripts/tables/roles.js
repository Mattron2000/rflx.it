'use strict';

import { log } from '../../src/logger.js';

import queryBuilder from '../../src/db/queryBuilder.js';

export const Role = { BASE: 'base', PHOTOGRAPHER: 'photographer' };

const name = 'roles';

function seed() {
	log(`Seeding ${name}...`);

	// prettier-ignore
	const datas = [
		{ name: Role.BASE },
		{ name: Role.PHOTOGRAPHER }
  ];

	const promises = datas.map(async (r) => {
		await queryBuilder(name)
			.insert(r)
			.returning('*')
			.then((res) => res[0])
			.then((res) => log(`role seed: ${JSON.stringify(res)}`));
	});

	return Promise.all(promises)
		.then(() => log('Roles seeded'))
		.catch((err) => log(err));
}

export default { seed, Role };
