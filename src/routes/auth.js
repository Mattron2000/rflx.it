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

router.get('/login', passportAuthenticate('/fail'), authController.login);

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({ message: 'not authenticated' });
};

router.get('/login/test', isLoggedIn, (req, res) => {
	res.send("I'm in...");
});

router.get('/logout', isLoggedIn, (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		res.send('logout success');
	});
});

export default router;
