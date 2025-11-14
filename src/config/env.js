const SERVER_PORT = Number(process.env.SERVER_PORT);
const NODE_ENV = process.env.NODE_ENV;

export const ENV_TYPE = Object.freeze({
	DEVELOPMENT: 'development',
	PRODUCTION: 'production'
});

if (isNaN(SERVER_PORT)) throw new Error('SERVER_PORT is NaN');
if (SERVER_PORT < 0 || SERVER_PORT > 6552) throw new Error(`Invalid SERVER_PORT: ${SERVER_PORT}`);

if (!Object.values(ENV_TYPE).includes(NODE_ENV)) throw new Error(`Invalid NODE_ENV: ${NODE_ENV}`);

export default Object.freeze({ SERVER_PORT: SERVER_PORT, NODE_ENV: NODE_ENV });
