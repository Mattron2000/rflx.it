'use strict';

import passport from '../config/passport.js';

const check = (req, res) =>
	req.isAuthenticated() ?
		res.status(200).json({ authenticated: true, user: req.user })
	:	res.status(401).json({ authenticated: false });

const login = () => {
	return [
		passport.authenticate('local', {
			failureRedirect: 'login-failure',
			successRedirect: 'login-success'
		}),
		(err, req, res, next) => {
			if (err) return next(err);
		}
	];
};

const login_success = (req, res) =>
	res.send(
		'<p>You successfully logged in. --> <a href="/home">Go to protected route</a></p>'
	);

const login_failure = (req, res) =>
	res.status(401).send('You entered the wrong password.');

const logout = (req, res, next) =>
	!req.isAuthenticated() ?
		res.send(304)
	:	req.logout((err) => (err ? next(err) : res.send(200)));

export default { check, login, login_success, login_failure, logout };
