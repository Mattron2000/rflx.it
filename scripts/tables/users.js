import { log } from '../../src/logger.js';
import userService from '../../src/service/user.js';

export default function seedUsers() {
	log('Seeding users...');

	// prettier-ignore
	const users = [
		{ name: 'Mario',	surname: 'Rossi',		email: 'mario@example.com',	password: '12341234' },
		{ name: 'Luigi',	surname: 'Verdi',		email: 'luigi@example.com',	password: 'qwerqwer' },
		{ name: 'Marco',	surname: 'Bianchi',	email: 'marco@example.com',	password: 'asdfasdf' }
  ];

	const promises = users.map(async (u) => {
		await userService
			.addNewUser(u)
			.then(() => log(`user seed: ${JSON.stringify(u)}`))
			.catch(() => log(`user ${JSON.stringify(u)} already inserted`));
	});

	return Promise.all(promises).then(() => log('Users seeded'));
}
