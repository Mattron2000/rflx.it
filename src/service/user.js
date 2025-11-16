import userRepository from '../repository/user.js';

function getUsers() {
	return userRepository.selectAllUsers();
}

function addNewUser(user) {
	return userRepository.insertNewUser(
		user.name,
		user.surname,
		user.email,
		user.password
	);
}

function getUserById(id) {
	return userRepository.selectUserWhereId(id);
}

export default { getUsers, getUserById, addNewUser };
