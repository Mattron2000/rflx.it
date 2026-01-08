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

CREATE TABLE photos (
	photo_name		TEXT PRIMARY KEY,
	user_nickname	TEXT NOT NULL,
	FOREIGN KEY (user_nickname) REFERENCES users (nickname)
);

CREATE TABLE posts (
	user_nickname	TEXT NOT NULL,
	photo_name		TEXT PRIMARY KEY,
	description		TEXT NOT NULL,
	FOREIGN KEY (user_nickname) REFERENCES users (nickname),
	FOREIGN KEY (photo_name) REFERENCES photos (photo_name)
);
