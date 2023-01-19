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
    ("p001", "Sunscreen", 10, "Acessories"),
    ("p002", "Backpack", 50, "Acessories"),
    ("p003", "Keyboard", 30, "Electronics"),
    ("p004", "Webcam", 70, "Electronics"),
    ("p005", "Radio", 60, "Electronics");

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
INSERT INTO products VALUES ("p006", "Mic", 45, "Electronics");

--------------
-- Exercicio 2
--------------

-- Get Products by id
SELECT * FROM products
WHERE id = "p002";

-- Delete User by id
DELETE FROM users
WHERE id = "4";

-- Delete Product by id
DELETE FROM products
WHERE id = "p006";

-- Edit User by id
UPDATE users
SET email = "totodog@gmail.com",
    password = "auau"
WHERE id = "4";

-- Edit Product by id
UPDATE products
SET name = "Mouse",
    price = 25
WHERE id = "p006";

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

-- Relacoes SQL
-- Exercicio 1
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- Exercicio 2
INSERT INTO purchases VALUES 
    ("c001", 80, 1, NULL, "1"),
    ("c002", 20, 1, NULL, "1"),
    ("c003", 50, 0, NULL, "2"),
    ("c004", 30, 1, NULL, "2");

UPDATE purchases
SET delivered_at = datetime('now')
WHERE id = "c002";

SELECT * FROM purchases;

-- Exercicio 3
SELECT 
    users.id AS userId,
    users.email,
    purchases.total_price
FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id;

-- Relacoes SQL II
-- Exercicio 1
DROP TABLE purchases_products;

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Exercicio 2
INSERT INTO purchases_products(purchase_id, product_id, quantity) VALUES
    ("c001", "p001", "2"),
    ("c001", "p002", "1"),
    ("c002", "p001", "1");

SELECT * FROM purchases_products;

SELECT 
purchases.id AS purchaseId,
products.name AS productName,
purchases.buyer_id AS buyerId
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

SELECT 
purchases.id AS purchaseId,
products.name AS productName,
purchases.buyer_id AS buyerId
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
RIGHT JOIN products
ON purchases_products.product_id = products.id;
