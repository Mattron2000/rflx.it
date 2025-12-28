import { log } from '../../src/logger.js';
import photoService from '../../src/service/photo.js';

export default function seedPhotos() {
	log('Seeding photos...');

	// prettier-ignore
	const photos = [];

	const promises = photos.map(async (p) => {
		await photoService
			.addNewPhoto(p)
			.then(() => log(`photo seed: ${JSON.stringify(p)}`));
	});

	return Promise.all(promises)
		.then(() => log('Photos seeded'))
		.catch((err) => log(err));
}
