import { Router } from 'express';

import userRoute from './user.js';
import authRoute from './auth.js';

const router = Router();

router.get('/', (_, res) => res.send('Hello, World!'));

router.use('/users', userRoute);

router.get('/session', (req, res) => {
	req.session.viewCount ? req.session.viewCount++ : req.session.viewCount = 1;

	res.send(`You have visited ${req.session.viewCount} times`);
});

router.use('/auth', authRoute);
router.get('/fail', (_, res) => res.send('FAIL!'));

export default router;
