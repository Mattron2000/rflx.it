'use strict';

import { Router, json } from 'express';

import passport from '../../config/passport.js';
import authController from '../../controller/auth.js';

export const currentApiDirectory = '/auth';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());
router.use(json());

router.get('/check', authController.check);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.delete('/logout', authController.logout);

export default router;
