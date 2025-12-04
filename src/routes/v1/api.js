import { Router } from 'express';

import authRouter, { currentApiDirectory as authCAD } from './auth.js';

export const currentApiDirectory = '/api/v1';

const router = Router();

router.use(authCAD, authRouter);

export default router;
