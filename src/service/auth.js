'use strict';

import { ValidationError, ConflictError } from '../error.js';

import userRepository from '../repository/user.js';

const registerNewUser = async (newUser) => {
	if (!newUser.nickname || !newUser.email || !newUser.password || !newUser.role)
		throw new ValidationError('Nickname, email, password and role are required');

	const user = await userRepository.selectUserWhereEmail(newUser.email);

	if (user) throw new ConflictError('Email already taken');

	return await userRepository.insertNewUser(
		newUser.nickname,
		newUser.email,
		newUser.password,
		newUser.role
	);
};

export default { registerNewUser };
