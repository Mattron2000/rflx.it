'use strict';

import photoRepository from '../repository/photo.js';

const addNewPhoto = (file, userNickname) => {
	if (!file || !userNickname)
		throw new Error('File and userNickname are required');

	const photoData = { photo_name: file.filename, user_nickname: userNickname };

	return photoRepository.insertPhoto(photoData);
};

const getAllPhotos = (page = 1) => {
	if (isNaN(page) || page < 1) throw new Error('Invalid page number');

	return photoRepository.getAllPhotos(page);
};

export default { addNewPhoto, getAllPhotos };
