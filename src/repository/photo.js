import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'photos';

function insertPhoto(photoData) {
	return queryBuilder(TABLE_NAME)
		.insert({ photo_name: photoData.photo_name, user_id: photoData.user_id })
		.then(() => photoData);
}

export default { insertPhoto };
