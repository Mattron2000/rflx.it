import { Router } from 'express';

import userRoute, { currentApiDirectory as usersCAD } from './user.js';
import authRoute, { currentApiDirectory as authCAD } from './auth.js';

export const currentApiDirectory = '/';

const router = Router();

router.get(currentApiDirectory, (_, res) => res.send('Hello, World!'));

router.use(usersCAD, userRoute);

router.use(authCAD, authRoute);
router.get('/fail', (_, res) => res.send('FAIL!'));

// router.get('/session', (req, res) => {
// 	req.session.viewCount ? req.session.viewCount++ : req.session.viewCount = 1;
//
// 	res.send(`You have visited ${req.session.viewCount} times`);
// });

export default router;
