'use strict';

import commentRepository from '../repository/comment.js';

const getAllCommentsByPostId = (photo_name) =>
	commentRepository.selectAllCommentsByPostId(photo_name);

export default { getAllCommentsByPostId };
