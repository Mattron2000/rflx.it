import { Router, json } from 'express';

import passport from '../../config/passport.js';

export const currentApiDirectory = '/auth';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());
router.use(json());

router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: 'login-failure',
		successRedirect: 'login-success'
	}),
	(err, req, res, next) => {
		if (err) next(err);
	}
);

router.get('/check', (req, res) => {
	if (req.isAuthenticated())
		return res.status(200).json({ authenticated: true, user: req.user });

	res.status(401).json({ authenticated: false });
});

router.get('/login-success', (req, res) => {
	res.send(
		'<p>You successfully logged in. --> <a href="/home">Go to protected route</a></p>'
	);
});

router.get('/login-failure', (req, res) => {
	res.status(401).send('You entered the wrong password.');
});

router.delete('/logout', (req, res, next) => {
	if (!req.isAuthenticated()) res.sendStatus(304);
	else
		req.logout((err) => {
			if (err) return next(err);

			res.sendStatus(200);
		});
});

export default router;
