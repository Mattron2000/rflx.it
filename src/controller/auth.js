'use strict';

import passport from '../config/passport.js';

import { ValidationError, ConflictError } from '../error.js';

import authService from '../service/auth.js';

const check = (req, res) =>
	req.isAuthenticated() ?
		res.json({ authenticated: true, user: req.session.user })
	:	res.json({ authenticated: false });

const login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);

		if (!user)
			return res
				.status(401)
				.json({ ok: false, title: info.title, messages: info.message });

		req.login(user, (err) => {
			if (err) {
				res
					.status(401)
					.json({ ok: false, title: info.title, messages: err.message });

				return;
			}

			res
				.status(200)
				.json({ ok: true, title: info.title, messages: 'Login successful' });

			req.session.user = {
				authenticated: true,
				nickname: user.nickname,
				email: user.email,
				role: user.user_role
			};
		});
	})(req, res, next);
};

const register = async (req, res) => {
	const { nickname, email, password, role } = req.body;

	try {
		const user = await authService.registerNewUser(
			nickname,
			email,
			password,
			role
		);

		return res
			.status(201)
			.json({
				ok: true,
				message: 'Registration successful',
				nickname: user.nickname,
				email: user.email,
				role: user.user_role
			});
	} catch (err) {
		if (err instanceof ValidationError)
			return res.status(400).json({ ok: false, message: err.message });

		if (err instanceof ConflictError)
			return res.status(409).json({ ok: false, message: err.message });

		return res.status(500).json({ ok: false, error: err });
	}
};

const logout = (req, res) =>
	req.isAuthenticated() ?
		req.session.destroy(() => {
			res.clearCookie('sid');
			res.sendStatus(204);
		})
	:	res.sendStatus(304);

export default { check, login, register, logout };
