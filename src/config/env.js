import fs from 'node:fs';
import path from 'node:path';

const SERVER_PORT = Number(process.env.SERVER_PORT);
const NODE_ENV = process.env.NODE_ENV;
const DB_PATH = process.env.DB_PATH;
const DB_SCHEMA_PATH = process.env.DB_SCHEMA_PATH;
const BCRYPT_SALT = process.env.BCRYPT_SALT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_DB_PATH = process.env.SESSION_DB_PATH;
const UPLOAD_DIR = process.env.UPLOAD_DIR;

export const ENV_TYPE = Object.freeze({
	DEVELOPMENT: 'development',
	PRODUCTION: 'production'
});

// SERVER_PORT
if (isNaN(SERVER_PORT)) throw new Error('SERVER_PORT is NaN');
if (SERVER_PORT < 0 || SERVER_PORT > 6552)
	throw new Error(`Invalid SERVER_PORT: ${SERVER_PORT}`);

// ENV_TYPE
if (!Object.values(ENV_TYPE).includes(NODE_ENV))
	throw new Error(`Invalid NODE_ENV: ${NODE_ENV}`);

// DB_PATH
if (!DB_PATH) throw new Error(`DB_PATH not set: ${DB_PATH}`);

let filepath = path.resolve(DB_PATH);

if (!fs.existsSync(filepath)) console.warn(`DB_PATH not exists: ${DB_PATH}`);

// DB_SCHEMA_PATH
if (!DB_SCHEMA_PATH)
	throw new Error(`DB_SCHEMA_PATH not set: ${DB_SCHEMA_PATH}`);

filepath = path.resolve(DB_SCHEMA_PATH);

if (!fs.existsSync(filepath))
	throw new Error(`DB_SCHEMA_PATH not exists: ${DB_SCHEMA_PATH}`);

// BCRYPT_SALT
if (!BCRYPT_SALT) throw new Error(`BCRYPT_SALT not set: ${BCRYPT_SALT}`);

// SESSION_SECRET
if (!SESSION_SECRET)
	throw new Error(`SESSION_SECRET not set: ${SESSION_SECRET}`);

// SESSION_DB_PATH
if (!SESSION_DB_PATH)
	throw new Error(`SESSION_DB_PATH not set: ${SESSION_DB_PATH}`);

filepath = path.resolve(SESSION_DB_PATH);

if (!fs.existsSync(filepath))
	throw new Error(`SESSION_DB_PATH not exists: ${SESSION_DB_PATH}`);

// UPLOAD_DIR
if (!UPLOAD_DIR)
	throw new Error(`UPLOAD_DIR not set: ${UPLOAD_DIR}`);

filepath = path.resolve(UPLOAD_DIR);

if (!fs.existsSync(filepath))
	throw new Error(`UPLOAD_DIR not exists: ${UPLOAD_DIR}`);

export default Object.freeze({
	SERVER_PORT: SERVER_PORT,
	NODE_ENV: NODE_ENV,
	DB_PATH: DB_PATH,
	DB_SCHEMA_PATH: DB_SCHEMA_PATH,
	BCRYPT_SALT: BCRYPT_SALT,
	SESSION_SECRET: SESSION_SECRET,
	SESSION_DB_PATH: SESSION_DB_PATH,
	UPLOAD_DIR: UPLOAD_DIR
});
