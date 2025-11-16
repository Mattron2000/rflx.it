import { Router } from 'express';

import userRoute from './user.js';

const router = Router();

router.get('/', (_, res) => res.send('Hello, World!'));

router.use('/users', userRoute);

export default router;
