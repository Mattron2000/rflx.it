import userRepository from '../repository/user.js';

/**
 * Fetches all users from the repository.
 *
 * @returns {Promise<any[]>} Promise resolving to an array of user records.
 */
function getUsers() {
	return userRepository.selectAllUsers();
}

/**
 * Adds a new user to the system.
 *
 * @param {{ name: string, surname: string, email: string, password: string }} user
 *        User data to insert.
 * @returns {Promise<any>} Promise resolving to the insert result.
 */
function addNewUser(user) {
	return userRepository.insertNewUser(
		user.name,
		user.surname,
		user.email,
		user.password,
		user.user_role
	);
}

/**
 * Retrieves a user by its unique ID.
 *
 * @param {number} id - The identifier of the user to fetch.
 * @returns {Promise<any[]>} Promise resolving to the user record(s).
 */
function getUserById(id) {
	return userRepository.selectUserWhereId(id);
}

export default { getUsers, getUserById, addNewUser };
