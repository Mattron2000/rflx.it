import { Router } from 'express';

import apiV1Route, { currentApiDirectory as apiV1CAD } from './v1/api.js';
import pageRoute, { currentApiDirectory as pageCAD } from './page.js';

export const currentApiDirectory = '/';

const router = Router();

router.use(apiV1CAD, apiV1Route);

router.use(pageCAD, pageRoute);

router.get('/', (_, res) => res.redirect('/welcome'));

router.get('/welcome', (_, res) => res.render('index'));

router.use((_, res) => res.redirect('/'));

export default router;
