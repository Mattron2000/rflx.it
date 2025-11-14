import express from 'express';

import env from './config/env.js';
import logger, { log } from './logger.js';
import route from "./routes/root.js";

const app = express();

app.use(logger());

app.use('/', route);

const port_number = env.SERVER_PORT;

app.listen(port_number);
log('Server running on http://localhost:' + port_number);
