import { Router } from 'express';

import passport from '../../config/passport.js';
import multer from '../../config/multer.js';

import postController from '../../controller/post.js';
import { isAuthenticated, isPhotographer } from '../../permission.js';

export const currentApiDirectory = '/posts';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/:id', postController.getPostById);

router.post(
	'/',
	isAuthenticated,
	isPhotographer,
	multer.single('photo'),
	postController.uploadPost
);

export default router;
