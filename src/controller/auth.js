const login = (req, res) => res.send(req.user);

const testLogin = (req, res) => res.send("I'm in...");

const logout = (req, res, next) =>
	req.logout((err) => {
		if (err) return next(err);
		res.send('logout success');
	});

export default { login, testLogin, logout };
