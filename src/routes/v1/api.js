'use strict';

import { Router } from 'express';

import authRouter, { currentApiDirectory as authCAD } from './auth.js';
import postRouter, { currentApiDirectory as postCAD } from './post.js';

export const currentApiDirectory = '/api/v1';

const router = Router();

router.use(authCAD, authRouter);
router.use(postCAD, postRouter);

export default router;
