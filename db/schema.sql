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

CREATE TABLE comments (
	created_at 	TEXT DEFAULT CURRENT_TIMESTAMP,
	post_id		TEXT NOT NULL,
	user_nickname TEXT NOT NULL,
	comment		TEXT NOT NULL,
	PRIMARY KEY (created_at, user_nickname),
	FOREIGN KEY (post_id) REFERENCES posts (photo_name),
	FOREIGN KEY (user_nickname) REFERENCES users (nickname)
);
