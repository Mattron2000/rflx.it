'use strict';

import passport from '../config/passport.js';

const check = (req, res) =>
	req.isAuthenticated() ?
		res.status(200).json({ authenticated: true, user: req.user })
	:	res.status(401).json({ authenticated: false });

const login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);

		if (!user)
			return res
				.status(401)
				.json({ message: info?.message || 'Invalid credentials' });

		req.login(user, (err) => {
			err ?
				res.status(401).json({ message: err?.message || 'Invalid credentials' })
			:	res
					.status(200)
					.json({
						message: 'Login successful',
						user: { name: user.name, surname: user.surname, email: user.email }
					});
		});
	})(req, res, next);
};

const logout = (req, res, next) =>
	!req.isAuthenticated() ?
		res.sendStatus(304)
	:	req.logout((err) => (err ? next(err) : res.sendStatus(200)));

export default { check, login, logout };
