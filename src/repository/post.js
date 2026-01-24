'use strict';

import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'posts';

function insertPost(photoData) {
	return queryBuilder(TABLE_NAME)
		.insert({
			user_nickname: photoData.user_nickname,
			photo_name: photoData.photo_name,
			description: photoData.description
		})
		.then(() => photoData)
		.catch((err) => err);
}

function selectPostWhereId(id) {
	return queryBuilder(TABLE_NAME)
		.select('*')
		.where('photo_name', id)
		.first()
		.then((post) => post)
		.catch((err) => err);
}

const limit = 20;
function selectPostsWherePageNumber(page = 1) {
	const offset = (page - 1) * limit;

	return queryBuilder(TABLE_NAME)
		.select('photo_name', 'user_nickname')
		.orderBy('created_at', 'desc')
		.limit(limit)
		.offset(offset)
}

export default { insertPost, selectPostWhereId, selectPostsWherePageNumber };
