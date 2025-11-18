import { Router, json } from 'express';

import passport from '../config/passport.js';
import authController from '../controller/auth.js';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());
router.use(json());

router.get(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/fail',
		failureMessage: true
	}),
	authController.login
);

export default router;
