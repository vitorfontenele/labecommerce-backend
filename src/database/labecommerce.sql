-- query a
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- query b
INSERT INTO users VALUES
    ("1", "dorothygale@gmail.com", "dvnvndsfv"),
    ("2", "scarecrow@hotmail.com", "12345"),
    ("3", "tinman@outlook.com", "password");

-- query c
SELECT * FROM users;

-- query d
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

-- query e
INSERT INTO products VALUES
    ("1", "Sunscreen", 10, "Acessories"),
    ("2", "Backpack", 50, "Acessories"),
    ("3", "Keyboard", 30, "Electronics"),
    ("4", "Webcam", 70, "Electronics"),
    ("5", "Radio", 60, "Electronics");

-- query f
SELECT * FROM products;