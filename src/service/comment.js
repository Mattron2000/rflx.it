'use strict';

import commentRepository from '../repository/comment.js';

const getAllCommentsByPostId = (photo_name) =>
	commentRepository.selectAllCommentsByPostId(photo_name);

const addNewComment = (id, comment, user_nickname) => {
	return commentRepository.insertComment(id, comment, user_nickname);
};

export default { getAllCommentsByPostId, addNewComment };
