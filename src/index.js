import express from 'express';

import env from './config/env.js';
import { log } from './logger.js';
import route from "./routes/root.js";

const app = express();

app.use('/', route);

const port_number = env.SERVER_PORT;

app.listen(port_number);
log('Server running on http://localhost:' + port_number);
