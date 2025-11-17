import { Router } from 'express';

import userRoute from './user.js';

const router = Router();

router.get('/', (_, res) => res.send('Hello, World!'));

router.use('/users', userRoute);

router.get('/session', (req, res) => {
	req.session.viewCount ? req.session.viewCount++ : req.session.viewCount = 1;

	res.send(`You have visited ${req.session.viewCount} times`);
});

export default router;
