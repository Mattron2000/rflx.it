'use strict';

import { hashSync } from "bcrypt";

import { log } from '../../src/logger.js';
import env from "../../src/config/env.js";
import queryBuilder from '../../src/db/queryBuilder.js';

import { Role } from './roles.js';

const name = 'users';

function seed() {
	log(`Seeding ${name}...`);

	// prettier-ignore
	const datas = [
		{ nickname: 'Mario',		email: 'mario@gmail.com',		password: '12341234',	user_role: Role.PHOTOGRAPHER },
		{ nickname: 'Luigi',		email: 'luigi@gmail.com',		password: '56875687',	user_role: Role.PHOTOGRAPHER },
		{ nickname: 'Wario',		email: 'wario@gmail.com',		password: 'asdfasdf',	user_role: Role.BASE },
		{ nickname: 'Waluigi',	email: 'waluigi@gmail.com',	password: 'qwerqwer',	user_role: Role.BASE }
  ];

	const promises = datas.map(async (u) => {
		u.password = hashSync(u.password, env.BCRYPT_SALT);

		await queryBuilder(name)
			.insert(u)
			.returning('*')
			.then((res) => res[0])
			.then((res) => log(`user seed: ${JSON.stringify(res)}`));
	});

	return Promise.all(promises)
		.then(() => log('Users seeded'))
		.catch((err) => log(err));
}

export default { seed };
