'use strict';

import commentService from '../service/comment.js';

const getAllCommentsByPostId = (req, res) => {
	const { id } = req.params;

	commentService
		.getAllCommentsByPostId(id)
		.then((comments) => res.status(200).json({ comments: comments }))
		.catch((err) => res.status(400).json(err));
};

export default { getAllCommentsByPostId };
