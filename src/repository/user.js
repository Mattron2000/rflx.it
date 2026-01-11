'use strict';

import bcrypt from 'bcrypt';

import env from '../config/env.js';
import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'users';

const selectUserWhereEmail = (email) =>
	queryBuilder(TABLE_NAME).select('*').where({ email }).first();

function insertNewUser(nickname, email, password, user_role) {
	return bcrypt
		.hash(password, env.BCRYPT_SALT)
		.then((hash) =>
			queryBuilder(TABLE_NAME)
				.insert({
					nickname: nickname,
					email: email,
					password: hash,
					user_role: user_role
				})
				.returning(['nickname', 'email', 'user_role'])
		).then((users) => users[0]);
}

export default { selectUserWhereEmail, insertNewUser };
