'use strict';

import express from 'express';
import fs from 'node:fs';

import session from './config/session.js';
import env from './config/env.js';
import logger, { log } from './logger.js';
import rootRoute, { currentApiDirectory as rootCAD } from './routes/root.js';

if (!fs.existsSync(env.DB_PATH)) {
	process.exit(1);
}

const app = express();

app.set('view engine', 'ejs');

app.use(session());

app.use(logger());

app.use(express.static('public'));

app.use(rootCAD, rootRoute);

const port_number = env.SERVER_PORT;

app.listen(port_number);
log('Server running on http://localhost:' + port_number);
