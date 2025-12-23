CREATE TABLE roles (
	name TEXT PRIMARY KEY
);

CREATE TABLE users (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	name			TEXT NOT NULL,
	surname		TEXT NOT NULL,
	email			TEXT NOT NULL UNIQUE,
	password	TEXT NOT NULL,
	user_role	TEXT DEFAULT 'base',
	FOREIGN KEY (user_role) REFERENCES roles (name)
);
