import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'comments';

function selectAllCommentsByPostId(photo_name) {
	return queryBuilder(TABLE_NAME)
		.select('created_at', 'user_nickname', 'comment')
		.where({ post_id: photo_name })
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
