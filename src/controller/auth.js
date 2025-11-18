function login(req, res) {
	res.send(req.user);
}

export default { login };
