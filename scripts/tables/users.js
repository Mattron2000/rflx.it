import { log } from '../../src/logger.js';
import userService from '../../src/service/user.js';

export default function seedUsers() {
	log('Seeding users...');

	// prettier-ignore
	const users = [
		{ nickname: 'Mario',	email: 'mario@gmail.com',	password: '12341234' , user_role: 'photographer' },
		{ nickname: 'Luigi',	email: 'luigi@gmail.com',	password: 'qwerqwer' , user_role: 'base' },
		{ nickname: 'Marco',	email: 'marco@gmail.com',	password: 'asdfasdf' , user_role: 'base' }
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
