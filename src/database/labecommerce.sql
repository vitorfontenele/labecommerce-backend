-- Intro SQL

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

-- Aprofundamento SQL

--------------
-- Exercicio 1
--------------

-- Get All Users
SELECT * FROM users;

-- Get All Products
SELECT * FROM products;

-- Search Product by Name
SELECT * FROM products
WHERE name LIKE "sunscreen";

-- Create User
INSERT INTO users VALUES ("4", "toto@gmail.com", "auauau");

-- Create Product
INSERT INTO products VALUES ("6", "Mic", 45, "Electronics");

--------------
-- Exercicio 2
--------------

-- Get Products by id
SELECT * FROM products
WHERE id = "2";

-- Delete User by id
DELETE FROM users
WHERE id = "4";

-- Delete Product by id
DELETE FROM products
WHERE id = "6";

-- Edit User by id
UPDATE users
SET email = "totodog@gmail.com",
    password = "auau"
WHERE id = "4";

-- Edit Product by id
UPDATE products
SET name = "Mouse",
    price = 25
WHERE id = "6";

--------------
-- Exercicio 3
--------------

-- Get All Users
-- resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versao 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- Get All Products versao 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE price > 40 AND price < 70
ORDER BY price ASC;