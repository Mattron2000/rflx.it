import queryBuilder from '../db/queryBuilder.js';

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
	return queryBuilder(TABLE_NAME).insert({
		name: name,
		surname: surname,
		email: email,
		password: password
	});
}

/**
 * Selects all users from the database table.
 *
 * @returns {Promise<any[]>} Promise resolving to all rows in the users table.
 */
function selectAllUsers() {
	return queryBuilder(TABLE_NAME).select('*');
}

/**
 * Selects a user from the database by ID.
 *
 * @param {number} id - The unique identifier of the user.
 * @returns {Promise<any[]>} Promise resolving to the matching user record.
 */
function selectUserWhereId(id) {
	return queryBuilder(TABLE_NAME).select('*').where({ id }).first();
}

export default { selectAllUsers, insertNewUser, selectUserWhereId };
