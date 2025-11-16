import userRepository from '../repository/user.js';

function addNewUser(user) {
	return userRepository.insertNewUser(
		user.name,
		user.surname,
		user.email,
		user.password
	);
}

export default { addNewUser };
