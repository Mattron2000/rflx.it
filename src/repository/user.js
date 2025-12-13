import bcrypt from 'bcrypt';

import queryBuilder from '../db/queryBuilder.js';
import env from '../config/env.js';

const TABLE_NAME = 'users';

/**
 * Inserts a new user into the database.
 *
 * @param {string} name - User's first name.
 * @param {string} surname - User's surname.
 * @param {string} email - User's email address.
 * @param {string} password - User's hashed or raw password.
 * @returns {Promise<any>} Promise resolving to the insert result.
 */
function insertNewUser(name, surname, email, password) {
	return bcrypt.hash(password, env.BCRYPT_SALT).then(async (hash) => {
		const [user] = await queryBuilder(TABLE_NAME)
			.insert({ name: name, surname: surname, email: email, password: hash })
			.returning(['name', 'surname', 'email']);

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

export default {
	insertNewUser,
	selectUserWhereEmail
};
