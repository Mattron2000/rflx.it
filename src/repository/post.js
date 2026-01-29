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
		.offset(offset);
}

function selectPostsWhereSearchQuery(nicknames, tags, description) {
	let result = queryBuilder(TABLE_NAME).select('*');

	if (nicknames.length > 0) result = result.whereIn('user_nickname', nicknames);
	if (tags.length > 0)
		for (const tag of tags)
			result = result.where('description', 'like', `%#${tag}%`);
	if (description)
		result = result.where('description', 'like', `%${description}%`);

	result = result.orderBy('created_at', 'desc');

	return result.returning('*');
}

export default {
	insertPost,
	selectPostWhereId,
	selectPostsWherePageNumber,
	selectPostsWhereSearchQuery
};
