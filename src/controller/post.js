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

export default { uploadPost };
