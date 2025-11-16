import queryBuilder from '../db/queryBuilder.js';

const TABLE_NAME = 'users';

function insertNewUser(name, surname, email, password) {
	return queryBuilder(TABLE_NAME).insert({
		name: name,
		surname: surname,
		email: email,
		password: password
	});
}

function selectAllUsers() {
	return queryBuilder(TABLE_NAME).select('*');
}

function selectUserWhereId(id) {
	return queryBuilder(TABLE_NAME).select('*').where({ id }).first();
}

export default { selectAllUsers, insertNewUser, selectUserWhereId };
