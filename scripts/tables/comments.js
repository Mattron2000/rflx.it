import { log } from '../../src/logger.js';

export default function seedComments() {
	log('Seeding comments...');

	// prettier-ignore
	const comments = [];

	const promises = comments.map((c) => {
		console.log(c);
	});

	return Promise.all(promises)
		.then(() => log('Comments seeded'))
		.catch((err) => log(err));
}
