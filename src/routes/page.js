'use strict';

import { Router } from 'express';

export const currentApiDirectory = '/pages';

const router = Router();

router.get('/:page', (req, res) =>
	res.render('pages/' + req.params.page, {}, (err, html) =>
		err ? res.status(404).send(err.message) : res.send(html)
	)
);

export default router;
