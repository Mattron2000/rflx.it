import fs from 'node:fs';
import path from 'node:path';

const SERVER_PORT = Number(process.env.SERVER_PORT);
const NODE_ENV = process.env.NODE_ENV;
const DB_PATH = process.env.DB_PATH;
const DB_SCHEMA_PATH = process.env.DB_SCHEMA_PATH;
const BCRYPT_SALT = process.env.BCRYPT_SALT;

export const ENV_TYPE = Object.freeze({
	DEVELOPMENT: 'development',
	PRODUCTION: 'production'
});

if (isNaN(SERVER_PORT)) throw new Error('SERVER_PORT is NaN');
if (SERVER_PORT < 0 || SERVER_PORT > 6552)
	throw new Error(`Invalid SERVER_PORT: ${SERVER_PORT}`);

if (!Object.values(ENV_TYPE).includes(NODE_ENV))
	throw new Error(`Invalid NODE_ENV: ${NODE_ENV}`);

if (!DB_PATH) throw new Error(`DB_PATH not set: ${DB_PATH}`);

let filepath = path.resolve(DB_PATH);

if (!fs.existsSync(filepath)) console.warn(`DB_PATH not exists: ${DB_PATH}`);

if (!DB_SCHEMA_PATH)
	throw new Error(`DB_SCHEMA_PATH not set: ${DB_SCHEMA_PATH}`);

filepath = path.resolve(DB_SCHEMA_PATH);

if (!fs.existsSync(filepath))
	throw new Error(`DB_SCHEMA_PATH not exists: ${DB_SCHEMA_PATH}`);

if (!BCRYPT_SALT)
	throw new Error(`BCRYPT_SALT not set: ${BCRYPT_SALT}`);

export default Object.freeze({
	SERVER_PORT: SERVER_PORT,
	NODE_ENV: NODE_ENV,
	DB_PATH: DB_PATH,
	DB_SCHEMA_PATH: DB_SCHEMA_PATH,
	BCRYPT_SALT: BCRYPT_SALT
});
