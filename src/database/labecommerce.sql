-- Intro SQL
DROP TABLE users;
DROP TABLE products;

-- query a
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

-- query b
INSERT INTO users(id, name, email, password) VALUES
    ("1", "Dorothy", "dorothygale@gmail.com", "dvnvndsfv"),
    ("2", "Scarecrow", "scarecrow@hotmail.com", "12345"),
    ("3", "Tin Man", "tinman@outlook.com", "password");

-- query c
SELECT * FROM users;

-- query d
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    category TEXT NOT NULL
);

-- query e
INSERT INTO products VALUES
    ("p001", "Sunscreen", 10, "Designed to protect you from UV radiation.", "https://static.beautytocare.com/media/catalog/product/cache/global/image/1300x1300/85e4522595efc69f496374d01ef2bf13/e/s/esthederm-sun-photo-regul-sunscreen-pigmentation-irregularities-50ml-2.jpg", "Acessories"),
    ("p002", "Backpack", 50, "Your best friend during your daily commute.", "https://www.helikon-tex.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/p/l/pl-dtn-nl-1919.jpg", "Acessories"),
    ("p003", "Keyboard", 30, "If you need to write, you need to type.", "https://m.media-amazon.com/images/I/71TKFcoGIJL._AC_SS450_.jpg", "Electronics"),
    ("p004", "Webcam", 70, "Show your face to the world with this amazing webcam.", "https://wb.fbitsstatic.net/img/p/256796/webcam-full-hd-1080p-wb-amplo-angulo-110%C2%B0-70183/256796.jpg?w=1200&h=1200", "Electronics"),
    ("p005", "Radio", 60, "Sometimes you need it a bit old-fashoned.", "https://cf.shopee.com.br/file/sg-11134201-23010-pncsckm0c0lv79", "Electronics");

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
DROP TABLE purchases;

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyerId TEXT NOT NULL,
    totalPrice REAL UNIQUE NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyerId) REFERENCES users(id)
);

-- Exercicio 2
INSERT INTO purchases(id, buyerId, totalPrice, paid) VALUES 
    ("c001", "2", 80, 1),
    ("c002", "3", 20, 1),
    ("c003", "4", 50, 0),
    ("c004", "1", 30, 1);

SELECT * FROM purchases;

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
DROP TABLE users;

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
