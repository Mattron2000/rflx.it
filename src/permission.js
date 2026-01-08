export function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) next();
	else res.status(401).json({ message: 'Unauthorized' });
}
export function isPhotographer(req, res, next) {
	if (req.session.user.role === 'photographer') next();
	else res.status(403).json({ message: 'Forbidden' });
}
