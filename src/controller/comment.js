'use strict';

import commentService from '../service/comment.js';

const getAllCommentsByPostId = (req, res) => {
	const { id } = req.params;

	commentService
		.getAllCommentsByPostId(id)
		.then((comments) => res.status(200).json({ comments: comments }))
		.catch((err) => res.status(400).json(err));
};

const uploadComment = (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;

	commentService
		.addNewComment(id, comment, req.session.user.nickname)
		.then((comment) =>
			res
				.status(201)
				.json({ message: 'Comment uploaded successfully', comment: comment[0] })
		)
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

export default { getAllCommentsByPostId, uploadComment };
