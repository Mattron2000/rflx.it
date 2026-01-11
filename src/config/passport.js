'use strict';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import validator from 'validator';

import userRepository from '../repository/user.js';

const customFieldNames = { usernameField: 'email', passwordField: 'password' };

const verify = (email, password, done) => {
	let errors = [];

	if (!validator.isEmail(email)) errors.push('Invalid email format');
	if (String(password).length < 8) errors.push('Password is not long enough.');

	if (errors.length > 0)
		return done(null, false, { title: 'Invalid credentials', message: errors });

	userRepository.selectUserWhereEmail(email).then((user) => {
		if (!user)
			return done(null, false, {
				title: 'User not found',
				message: 'User with this email not exists.'
			});

		return bcrypt.compareSync(password, user.password) ?
				done(null, user, { message: 'Login successful' })
			:	done(null, false, {
					title: 'Incorrect password',
					message: 'Incorrect password.'
				});
	});
};

passport.use(new LocalStrategy(customFieldNames, verify));

passport.serializeUser((user, done) => {
	process.nextTick(() =>
		done(null, { nickname: user.nickname, email: user.email })
	);
});

passport.deserializeUser((user, done) => {
	process.nextTick(() => done(null, user));
});

export default passport;
