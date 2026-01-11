import multer from 'multer';
import { extname } from 'path';

import env from './env.js';

const storage = multer.diskStorage({
	destination: (req, file, done) => done(null, env.POST_IMAGE_DIR),
	filename: (req, file, done) => done(null, generateFilename(file.originalname))
});

const generateFilename = (name) => {
	const extension = extname(name);
	return `${crypto.randomUUID()}${extension}`;
};

export default multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024 // 5MB
	},
	fileFilter: (req, file, done) => {
		if (!file.mimetype.startsWith('image/'))
			done(new Error('Only image files are allowed'), false);
		else done(null, true);
	}
});
