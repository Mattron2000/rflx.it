import { Router } from 'express';

import apiV1Route, { currentApiDirectory as apiV1CAD } from './v1/api.js';

export const currentApiDirectory = '/';

const router = Router();

router.use(apiV1CAD, apiV1Route);

router.get('/', (_, res) => res.render('index'));

router.use((_, res) => res.redirect('/'));

export default router;
