'use strict';

import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'comments';

function selectAllCommentsByPostId(post_id) {
	return queryBuilder(TABLE_NAME)
		.select('created_at', 'user_nickname', 'comment')
		.where({ post_id })
		.orderBy('created_at', 'desc')
		.catch((err) => err);
}

function insertComment(post_id, comment, user_nickname) {
	return queryBuilder(TABLE_NAME)
		.insert({ post_id, user_nickname, comment })
		.returning('*')
		.catch((err) => err);
}

export default { selectAllCommentsByPostId, insertComment };
