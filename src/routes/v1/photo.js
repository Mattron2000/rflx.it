import { Router } from 'express';

import passport from '../../config/passport.js';
import multer from '../../config/multer.js';
import photoController from '../../controller/photo.js';

export const currentApiDirectory = '/photos';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.post(
	'/',
	isAuthenticated,
	isPhotographer,
	multer.single('photo'),
	photoController.uploadPhoto
);

router.get('/', photoController.getAllPhotos);

export default router;

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) next();
	else res.status(401).json({ message: 'Unauthorized' });
}

function isPhotographer(req, res, next) {
	if (req.session.user.role === 'photographer') next();
	else res.status(403).json({ message: 'Forbidden' });
}
