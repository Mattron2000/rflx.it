'use strict';

import { Router } from 'express';

import commentController from '../../controller/comment.js';

export const currentApiDirectory = '/comments';

const router = Router({ mergeParams: true });

router.get('/', commentController.getAllCommentsByPostId);

export default router;
