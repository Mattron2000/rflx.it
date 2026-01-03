import { log } from '../../src/logger.js';
import postService from '../../src/service/post.js';

export default function seedPosts() {
	log('Seeding posts...');

	// prettier-ignore
	const posts = [];

	const promises = posts.map(async (p) => {
		await postService
			.addNewPost(p)
			.then(() => log(`post seed: ${JSON.stringify(p)}`));
	});

	return Promise.all(promises)
		.then(() => log('Posts seeded'))
		.catch((err) => log(err));
}
