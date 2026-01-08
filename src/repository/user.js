import bcrypt from 'bcrypt';

import queryBuilder from '../db/queryBuilder.js';
import env from '../config/env.js';

const TABLE_NAME = 'users';

/**
 * Inserts a new user into the database.
 *
 * @param {string} nickname - User's nickname.
 * @param {string} email - User's email address.
 * @param {string} password - User's hashed or raw password.
 * @returns {Promise<any>} Promise resolving to the insert result.
 */
function insertNewUser(nickname, email, password, user_role) {
	return bcrypt.hash(password, env.BCRYPT_SALT).then(async (hash) => {
		const [user] = await queryBuilder(TABLE_NAME)
			.insert({
				nickname: nickname,
				email: email,
				password: hash,
				user_role: user_role
			})
			.returning(['nickname', 'email', 'user_role']);

		return user;
	});
}

/**
 * Selects a user from the database by email.
 *
 * @param {string} email - The email of the user.
 * @returns {Promise<any>} Promise resolving to the matching user record.
 */
function selectUserWhereEmail(email) {
	return queryBuilder(TABLE_NAME).select('*').where({ email }).first();
}

export default { insertNewUser, selectUserWhereEmail };
