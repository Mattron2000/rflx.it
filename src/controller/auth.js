'use strict';

import passport from '../config/passport.js';
import { ValidationError, ConflictError } from '../error.js';

import authService from '../service/auth.js';

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
				.json({ ok: false, title: info.title, messages: info.message });

		req.login(user, (err) => {
			err ?
				res
					.status(401)
					.json({ ok: false, title: info.title, messages: err.message })
			:	res
					.status(200)
					.json({
						ok: true,
						title: info.title,
						messages: 'Login successful',
						user: { name: user.name, surname: user.surname, email: user.email }
					});
		});
	})(req, res, next);
};

const logout = (req, res, next) =>
	!req.isAuthenticated() ?
		res.sendStatus(304)
	:	req.logout((err) => (err ? next(err) : res.sendStatus(200)));

const register = async (req, res) => {
	const { name, surname, email, password } = req.body;

	try {
		const user = await authService.registerNewUser({
			name,
			surname,
			email,
			password
		});

		return res
			.status(201)
			.json({
				ok: true,
				name: user.name,
				surname: user.surname,
				email: user.email
			});
	} catch (err) {
		if (err instanceof ValidationError)
			return res.status(400).json({ ok: false, message: err.message });

		if (err instanceof ConflictError)
			return res.status(409).json({ ok: false, message: err.message });

		return res.status(500).json({ ok: false, error: err });
	}
};

export default { check, login, logout, register };
