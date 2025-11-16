import userService from '../service/user.js';

function getAllUsers(_, res) {
	userService.getUsers().then((users) => res.json(users));
}

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
