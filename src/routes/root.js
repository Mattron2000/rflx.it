import { Router } from 'express';

import userRoute, { currentApiDirectory as usersCAD } from './user.js';
import authRoute, { currentApiDirectory as authCAD } from './auth.js';

const router = Router();

router.get('/', (_, res) => res.send('Hello, World!'));

router.use(usersCAD, userRoute);

router.get('/session', (req, res) => {
	req.session.viewCount ? req.session.viewCount++ : req.session.viewCount = 1;

	res.send(`You have visited ${req.session.viewCount} times`);
});

router.use(authCAD, authRoute);
router.get('/fail', (_, res) => res.send('FAIL!'));

export default router;
