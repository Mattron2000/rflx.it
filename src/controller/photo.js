'use strict';

import photoService from '../service/photo.js';

const uploadPhoto = (req, res, next) => {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	photoService
		.addNewPhoto(req.file, req.user?.id)
		.then((photo) => res.status(201).json(photo))
		.catch((err) => next(err));
};

export default { uploadPhoto };
