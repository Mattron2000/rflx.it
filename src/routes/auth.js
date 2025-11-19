import { Router, json } from 'express';

import passport from '../config/passport.js';
import authController from '../controller/auth.js';

export const currentApiDirectory = '/auth';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());
router.use(json());

const passportAuthenticate = (failureRedirect) =>
	passport.authenticate('local', {
		failureRedirect: failureRedirect,
		failureMessage: true
	});

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();

	return res.status(401).json({ message: 'not authenticated' });
};

router.get('/login', passportAuthenticate('/fail'), authController.login);

router.get('/login/test', isLoggedIn, authController.testLogin);

router.get('/logout', isLoggedIn, authController.logout);

export default router;
