'use strict';

import { Router } from 'express';

import passport from '../../config/passport.js';
import photoController from '../../controller/photo.js';

export const currentApiDirectory = '/photos';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/', photoController.getPhotoBatchByPageNumber);

export default router;
