import { Router } from 'express';

import userController from '../controller/user.js';

export const currentApiDirectory = '/users';

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

export default router;
