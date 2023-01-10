"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.get("/users/:id/purchases", (req, res) => {
    const userId = req.params.id;
    const result = database_1.purchases.filter(purchase => purchase.userId === userId);
    res.status(200).send(result);
});
app.put("/user/:id", (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    const password = req.body.password;
    const user = database_1.users.find(user => user.id === id);
    if (user) {
        user.email = email || user.email;
        user.password = password || user.password;
    }
    res.status(200).send("Cadastro atualizado com sucesso");
});
app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = database_1.users.findIndex(user => user.id === id);
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
    }
    res.status(200).send("User apagado com sucesso");
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.products);
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find(product => product.id === id);
    res.status(200).send(result);
});
app.get("/purchases", (req, res) => {
    res.status(200).send(database_1.purchases);
});
app.get("/product/search", (req, res) => {
    const q = req.query.q;
    const result = (0, database_1.queryProductsByName)(q);
    res.status(200).send(result);
});
app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const product = database_1.products.find(product => product.id === id);
    if (product) {
        product.name = name || product.name;
        product.category = category || product.category;
        product.price = isNaN(price) ? product.price : price;
    }
    res.status(200).send("Produto atualizado com sucesso!");
});
app.delete("/product/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex(product => product.id === id);
    if (productIndex >= 0) {
        database_1.users.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
});
app.post("/users", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    (0, database_1.createUser)(id, email, password);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post("/products", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    (0, database_1.createProduct)(id, name, price, category);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post("/purchases", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    (0, database_1.createPurchase)(userId, productId, quantity, totalPrice);
    res.status(201).send("Compra realizada com sucesso");
});
app.listen(3003, () => {
    console.log("Servidor rodando!");
});
//# sourceMappingURL=index.js.map