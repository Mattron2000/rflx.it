'use strict';

import photoRepository from '../repository/photo.js';

const getPhotoBatchByPageNumber = (page = 1) => {
	if (isNaN(page) || page < 1) throw new Error('Invalid page number');

	return photoRepository.getPhotoBatchByPageNumber(page);
};

export default { getPhotoBatchByPageNumber };
