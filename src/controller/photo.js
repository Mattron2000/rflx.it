'use strict';

import photoService from '../service/photo.js';

const getPhotoBatchByPageNumber = (req, res) => {
	const page = req.query.page || 1;

	photoService
		.getPhotoBatchByPageNumber(page)
		.then((photos) => res.status(200).json(photos))
		.catch((err) => res.status(400).json(err));
};

export default { getPhotoBatchByPageNumber };
