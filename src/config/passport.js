import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import userRepository from '../repository/user.js';

const customFieldNames = { usernameField: 'email', passwordField: 'password' };

const verify = (email, password, done) => {
	userRepository.selectUserWhereEmail(email).then((user) => {
		if (!user) return done(null, false);

		if (bcrypt.compareSync(password, user.password)) return done(null, user);
		else return done(null, false);
	});
};

passport.use(new LocalStrategy(customFieldNames, verify));

passport.serializeUser((user, done) => {
	process.nextTick(() => done(null, { id: user.id, email: user.email }));
});

passport.deserializeUser((user, done) => {
	process.nextTick(() => done(null, user));
});

export default passport;
