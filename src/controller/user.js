import userService from '../service/user.js';

/**
 * Retrieves all users and returns them as JSON.
 *
 * @param {import('express').Request} _ - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
function getAllUsers(_, res) {
	userService.getUsers().then((users) => res.json(users));
}

/**
 * Handles a request to retrieve a user by ID.
 * Responds with the user data if found, otherwise returns 404.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
function getUserById(req, res) {
	const { id } = req.params;
	userService
		.getUserById(id)
		.then((u) =>
			u ?
				res.status(200).json({ u })
			:	res.status(404).json({ message: 'user not found' })
		);
}

export default { getAllUsers, getUserById };
