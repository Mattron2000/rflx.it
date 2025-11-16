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

export default { insertNewUser };
