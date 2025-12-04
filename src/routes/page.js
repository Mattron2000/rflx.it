import { Router } from 'express';

export const currentApiDirectory = '/pages';

const router = Router();

router.get('/:page', (req, res) => res.render('pages/' + req.params.page));

export default router;
