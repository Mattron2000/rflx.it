import { log } from '../../src/logger.js';
import userService from '../../src/service/user.js';
import { Role } from './roles.js';

export default function seedUsers() {
	log('Seeding users...');

	// prettier-ignore
	const users = [
		{ nickname: 'Balotelli',	email: 'balotelli@gmail.com',	password: 'zxcvzxcv',	user_role: Role.PHOTOGRAPHER },
		{ nickname: 'Mario',			email: 'mario@gmail.com',			password: '12341234',	user_role: Role.PHOTOGRAPHER },
		{ nickname: 'Luigi',			email: 'luigi@gmail.com',			password: 'qwerqwer',	user_role: Role.BASE },
		{ nickname: 'Marco',			email: 'marco@gmail.com',			password: 'asdfasdf',	user_role: Role.BASE }
  ];

	const promises = users.map(async (u) => {
		await userService
			.addNewUser(u)
			.then(() => log(`user seed: ${JSON.stringify(u)}`));
	});

	return Promise.all(promises)
		.then(() => log('Users seeded'))
		.catch((err) => log(err));
}
