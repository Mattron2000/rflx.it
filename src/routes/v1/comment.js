'use strict';

import { Router, json } from 'express';

import { isAuthenticated } from '../../permission.js';

import commentController from '../../controller/comment.js';

export const currentApiDirectory = '/comments';

const router = Router({ mergeParams: true });
router.use(json());

router.get('/', commentController.getAllCommentsByPostId);

router.post('/', isAuthenticated, commentController.uploadComment);

export default router;
