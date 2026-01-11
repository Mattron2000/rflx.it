'use strict';

import { Router } from 'express';

import authRouter, { currentApiDirectory as authCAD } from './auth.js';
import postRouter, { currentApiDirectory as postCAD } from './post.js';
import photoRouter, { currentApiDirectory as photoCAD } from './photo.js';

export const currentApiDirectory = '/api/v1';

const router = Router();

router.use(authCAD, authRouter);
router.use(postCAD, postRouter);
router.use(photoCAD, photoRouter);

export default router;
