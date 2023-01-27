-- Inicio das queries de manipulação de dados nas tabelas "users" e "products"
-- As queries incluem operações como inserção, exclusão e seleção de dados

-- query a
DROP TABLE users;

-- query b
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

-- query c
INSERT INTO users(id, name, email, password) VALUES
    ("u001", "John Smith", "johnsmith@gmail.com", "Pass1"),
    ("u002", "Emily Brown", "emilybrown@gmail.com", "P@s2wrd"),
    ("u003", "Jacob Davis", "jacobdavis@gmail.com", "s3cure"),
    ("u004", "Michael Garcia", "michaelgarcia@gmail.com", "Sec1Pass"),
    ("u005", "Madison Taylor", "madisontaylor@gmail.com", "Pass2!"),
    ("u006", "Daniel Martinez", "danielmartinez@gmail.com", "P@ss3"),
    ("u007", "Matthew Anderson", "matthewanderson@gmail.com", "S3c4Pass"),
    ("u008", "Joshua Thompson", "joshuathompson@gmail.com", "p@ss5"),
    ("u009", "Andrew Gonzalez", "andrewgonzalez@gmail.com", "SecP@s2");

-- query d
SELECT * FROM users;

-- query e
DROP TABLE products;

-- query f
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL
);

-- query g
INSERT INTO products(id, name, price, description, image_url, category) VALUES
    ("prod001", "Sunscreen", 10, "Designed to protect you from UV radiation.", "https://dummy.com/sunscreen.jpg", "Acessories"),
    ("prod002", "Sunglasses", 15, "Protect your eyes from the sun.", "https://dummy.com/sunglasses.jpg", "Acessories"),
    ("prod003", "Blender", 25, "Blend and mix your ingredients with ease.", "https://dummy.com/blender.jpg", "Electronics"),
    ("prod004", "Shirt", 30, "Comfortable and stylish.", "https://dummy.com/shirt.jpg", "Clothes and Shoes"),
    ("prod005", "Pants", 40, "Perfect for any occasion.", "https://dummy.com/pants.jpg", "Clothes and Shoes"),
    ("prod006", "Smartphone", 600, "Stay connected and productive.", "https://dummy.com/smartphone.jpg", "Electronics"),
    ("prod007", "Laptop", 900, "Powerful and portable.", "https://dummy.com/laptop.jpg", "Electronics"),
    ("prod008", "Watch", 100, "Stay on time and on style.", "https://dummy.com/watch.jpg", "Acessories"),
    ("prod009", "Shoes", 50, "Comfortable and stylish.", "https://dummy.com/shoes.jpg", "Clothes and Shoes");

-- Inicio das queries de manipulação de dados nas tabelas "purchases" e "purchases_products"
-- As queries incluem operações como inserção, exclusão e seleção de dados

-- query h
DROP TABLE purchases;

-- query i
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

-- query j
INSERT INTO purchases(id, buyer, total_price) VALUES 
    ("pur001", "u001", 1500);

-- query k
SELECT * FROM purchases;

-- query l
DROP TABLE purchases_products;

-- query m
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- query n
INSERT INTO purchases_products(purchase_id, product_id, quantity) VALUES
    ("pur001", "prod006", 1),
    ("pur001", "prod007", 1);

-- query o
SELECT * FROM purchases_products;

-- Queries com uso de JOIN
-- Queries similares foram necessárias no código em Typescript

-- query p
SELECT 
purchases.id AS purchaseId,
purchases.buyer AS buyerId,
users.name AS buyerName,
users.email AS buyerEmail,
purchases.total_price AS totalPrice,
purchases.created_at AS createdAt,
purchases.paid AS paid
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id
WHERE purchases.id = "pur001";

-- query q
SELECT
products.id AS id,
products.name AS name,
products.price AS price,
products.description AS description,
products.image_url AS imageUrl,
purchases_products.quantity AS quantity
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
WHERE purchases_products.purchase_id = "pur001";
