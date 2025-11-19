import express from 'express';

import session from './config/session.js';
import env from './config/env.js';
import logger, { log } from './logger.js';
import rootRoute, { currentApiDirectory as rootCAD } from './routes/root.js';

const app = express();

app.use(session());

app.use(logger());

app.use(rootCAD, rootRoute);

const port_number = env.SERVER_PORT;

app.listen(port_number);
log('Server running on http://localhost:' + port_number);
