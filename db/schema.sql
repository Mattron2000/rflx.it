CREATE TABLE roles (
	name TEXT PRIMARY KEY
);

CREATE TABLE users (
	nickname	TEXT NOT NULL PRIMARY KEY,
	email			TEXT NOT NULL UNIQUE,
	password	TEXT NOT NULL,
	user_role	TEXT DEFAULT 'base',
	FOREIGN KEY (user_role) REFERENCES roles (name)
);

CREATE TABLE posts (
	created_at		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	photo_name		TEXT PRIMARY KEY,
	user_nickname	TEXT NOT NULL,
	description		TEXT DEFAULT '',
	FOREIGN KEY (user_nickname) REFERENCES users (nickname)
);
