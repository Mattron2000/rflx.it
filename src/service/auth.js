'use strict';

import { ValidationError, ConflictError } from '../error.js';

import userRepository from '../repository/user.js';

const registerNewUser = async (newUser) => {
	if (!newUser.name || !newUser.surname || !newUser.email || !newUser.password)
		throw new ValidationError('Name, surname, email and password are required');

	const user = await userRepository.selectUserWhereEmail(newUser.email);

	if (user) throw new ConflictError('Email already taken');

	return await userRepository
		.insertNewUser(
			newUser.name,
			newUser.surname,
			newUser.email,
			newUser.password
		);
};

export default { registerNewUser };
