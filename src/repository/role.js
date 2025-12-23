import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'roles';

/**
 * Inserts a new role into the database.
 *
 * @param {string} name - Role's name.
 * @returns {Promise<any>} Promise resolving to the insert result.
 */
function insertNewRole(name) {
	return queryBuilder(TABLE_NAME).insert({ name: name }).returning(['name']);
}

export default { insertNewRole };
