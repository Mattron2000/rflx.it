import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'photos';

function insertPhoto(photoData) {
	return queryBuilder(TABLE_NAME)
		.insert({ photo_name: photoData.photo_name, user_id: photoData.user_id })
		.then(() => photoData);
}

const limit = 20;
function getAllPhotos(page = 1) {
	const offset = (page - 1) * limit;

	return queryBuilder(TABLE_NAME).select('*').limit(limit).offset(offset);
}

export default { insertPhoto, getAllPhotos };
