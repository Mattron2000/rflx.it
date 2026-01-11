'use strict';

import { ValidationError, ConflictError } from '../error.js';

import userRepository from '../repository/user.js';

const registerNewUser = async (nickname, email, password, role) => {
	if (!nickname || !email || !password || !role)
		throw new ValidationError(
			'Nickname, email, password and role are required'
		);

	const user = await userRepository.selectUserWhereEmail(email);

	if (user) throw new ConflictError('Email already taken');

	return await userRepository.insertNewUser(nickname, email, password, role);
};

export default { registerNewUser };
