import { log } from '../../src/logger.js';
import roleService from '../../src/service/role.js';

const Role = { BASE: 'base', PHOTOGRAPHER: 'photographer' };

export default function seedRoles() {
	log('Seeding roles...');

	// prettier-ignore
	const roles = [
		{ name: Role.BASE },
		{ name: Role.PHOTOGRAPHER }
  ];

	const promises = roles.map(async (r) => {
		await roleService
			.addNewRole(r)
			.then(() => log(`role seed: ${JSON.stringify(r)}`));
	});

	return Promise.all(promises)
		.then(() => log('Roles seeded'))
		.catch((err) => log(err));
}

export { Role };
