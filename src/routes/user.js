import { Router } from 'express';

import userController from '../controller/user.js';

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

export default router;
