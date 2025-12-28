'use strict';

import photoRepository from '../repository/photo.js';

const addNewPhoto = (file, userId) => {
	if (!file || !userId) throw new Error('File and userId are required');

	const photoData = { photo_name: file.filename, user_id: userId };

	return photoRepository
		.insertPhoto(photoData)
		.then((savedPhoto) => savedPhoto);
};

export default { addNewPhoto };
