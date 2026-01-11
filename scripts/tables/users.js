'use strict';

import { log } from '../../src/logger.js';

import { Role } from './roles.js';

import queryBuilder from '../../src/db/queryBuilder.js';

const name = 'users';

function seed() {
	log(`Seeding ${name}...`);

	// prettier-ignore
	const datas = [
		{ nickname: 'Luigi',		email: 'luigi@gmail.com',		password: 'zxcvzxcv',	user_role: Role.PHOTOGRAPHER },
		{ nickname: 'Mario',		email: 'mario@gmail.com',		password: '12341234',	user_role: Role.PHOTOGRAPHER },
		{ nickname: 'Waluigi',	email: 'waluigi@gmail.com',	password: 'qwerqwer',	user_role: Role.BASE },
		{ nickname: 'Wario',		email: 'wario@gmail.com',		password: 'asdfasdf',	user_role: Role.BASE }
  ];

	const promises = datas.map(async (r) => {
		await queryBuilder(name)
			.insert({
				nickname: r.nickname,
				email: r.email,
				password: r.password,
				user_role: r.user_role
			})
			.returning('*')
			.then((res) => res[0])
			.then((res) => log(`user seed: ${JSON.stringify(res)}`));
	});

	return Promise.all(promises)
		.then(() => log('Users seeded'))
		.catch((err) => log(err));
}

export default { seed };
