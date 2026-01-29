'use strict';

import postService from '../service/post.js';

const uploadPost = (req, res) => {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	postService
		.addNewPost(req.file, req.session.user.nickname, req.body.description)
		.then(() => res.status(201).json({ message: 'Post uploaded successfully' }))
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const getPostById = (req, res) =>
	postService
		.getPostById(req.params.id)
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(400).json(err));

const getPosts = (req, res) => {
	const page = req.query.page || 1;

	if (req.query.search !== undefined) {
		const search = req.query.search || '';

		if (search !== '')
			return postService
				.getPostsBySearchQuery(search)
				.then((posts) => res.status(200).json({ ok: true, posts: posts }))
				.catch(() => res.status(404).json({ ok: false, message: 'No posts found' }));
	}

	postService
		.getPostsByPageNumber(page)
		.then((posts) => res.status(200).json(posts))
		.catch((err) => res.status(400).json(err));
};

export default { uploadPost, getPostById, getPosts };
