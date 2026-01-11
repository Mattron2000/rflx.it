'use strict';

import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'posts';

const limit = 20;
function getPhotoBatchByPageNumber(page = 1) {
	const offset = (page - 1) * limit;

	return queryBuilder(TABLE_NAME)
		.select('photo_name', 'user_nickname')
		.orderBy('created_at', 'desc')
		.limit(limit)
		.offset(offset)
}

export default { getPhotoBatchByPageNumber };
