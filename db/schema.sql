CREATE TABLE roles (
	name TEXT PRIMARY KEY
);

CREATE TABLE users (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	nickname	TEXT NOT NULL UNIQUE,
	email			TEXT NOT NULL UNIQUE,
	password	TEXT NOT NULL,
	user_role	TEXT DEFAULT 'base',
	FOREIGN KEY (user_role) REFERENCES roles (name)
);

CREATE TABLE photos (
	photo_name	TEXT NOT NULL PRIMARY KEY,
	user_id			INTEGER NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id)
);
