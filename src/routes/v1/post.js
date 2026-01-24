'use strict';

import { Router } from 'express';

import passport from '../../config/passport.js';
import multer from '../../config/multer.js';

import { isAuthenticated, isPhotographer } from '../../permission.js';

import postController from '../../controller/post.js';
import commentRouter, { currentApiDirectory as commentCAD } from './comment.js';

export const currentApiDirectory = '/posts';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/', postController.getPosts);

router.post(
	'/',
	isAuthenticated,
	isPhotographer,
	multer.single('photo'),
	postController.uploadPost
);

router.get('/:id', postController.getPostById);
router.use('/:id' + commentCAD, commentRouter);

export default router;
