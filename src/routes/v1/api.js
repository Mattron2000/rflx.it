import { Router } from 'express';

import authRouter, { currentApiDirectory as authCAD } from './auth.js';
import photoRouter, { currentApiDirectory as photoCAD } from './photo.js';
import postRouter, { currentApiDirectory as postCAD } from './post.js';

export const currentApiDirectory = '/api/v1';

const router = Router();

router.use(authCAD, authRouter);
router.use(photoCAD, photoRouter);
router.use(postCAD, postRouter);

export default router;
