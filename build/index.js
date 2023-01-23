"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw("SELECT * FROM users;");
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
}));
app.get("/users/:id/purchases", (req, res) => {
    try {
        const userId = req.params.id;
        const result = database_1.purchases.filter(purchase => purchase.userId === userId);
        if (!result) {
            res.status(404);
            throw new Error("Compra não encontrada");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;
        const user = database_1.users.find(user => user.id === id);
        if (!user) {
            res.status(404);
            throw new Error("Usuário não encontrado");
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400);
                throw new Error("Email deve ser uma string");
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400);
                throw new Error("Senha deve ser uma string");
            }
        }
        user.email = email || user.email;
        user.password = password || user.password;
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        const userIndex = database_1.users.findIndex(user => user.id === id);
        if (userIndex >= 0) {
            database_1.users.splice(userIndex, 1);
        }
        else {
            res.status(404);
            throw new Error("Usuário não encontrado");
        }
        res.status(200).send("User apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw("SELECT * FROM products;");
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
}));
app.get("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.products.find(product => product.id === id);
        if (!result) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/purchases", (req, res) => {
    res.status(200).send(database_1.purchases);
});
app.get("/product/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400);
                throw new Error("'q' deve possuir ao menos um caracter");
            }
        }
        else {
            res.status(400);
            throw new Error("'q' precisa ser definido");
        }
        const product = yield knex_1.db.raw(`
            SELECT * FROM products
            WHERE name LIKE('%${q}%');
        `);
        res.status(200).send(product);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.put("/product/:id", (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const product = database_1.products.find(product => product.id === id);
        if (!product) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("Nome do produto deve ser uma string");
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400);
                throw new Error("Preço do produto deve ser um número");
            }
        }
        if (category !== undefined) {
            if (category !== "Acessórios" &&
                category !== "Roupas" &&
                category !== "Eletrônicos") {
                res.status(400);
                throw new Error("Categoria deve ser uma das existentes");
            }
        }
        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;
        res.status(200).send("Produto atualizado com sucesso!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/product/:id", (req, res) => {
    try {
        const id = req.params.id;
        const productIndex = database_1.products.findIndex(product => product.id === id);
        if (productIndex >= 0) {
            database_1.users.splice(productIndex, 1);
        }
        else {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("Id do user deve ser uma string");
            }
            for (let i = 0; i < database_1.users.length; i++) {
                if (database_1.users[i].id === id) {
                    res.status(400);
                    throw new Error("Já existe um user com esse id");
                }
            }
        }
        else {
            res.status(400);
            throw new Error("User precisa ter um id");
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400);
                throw new Error("Email do user deve ser uma string");
            }
            for (let i = 0; i < database_1.users.length; i++) {
                if (database_1.users[i].email === email) {
                    res.status(400);
                    throw new Error("Já existe um user com esse email");
                }
            }
        }
        else {
            res.status(400);
            throw new Error("User precisa ter um email");
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400);
                throw new Error("Password do user deve ser uma string");
            }
        }
        else {
            res.status(400);
            throw new Error("User precisa ter um password");
        }
        (0, database_1.createUser)(id, email, password);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("Id deve ser uma string");
            }
            for (let i = 0; i < database_1.products.length; i++) {
                if (database_1.products[i].id === id) {
                    res.status(400);
                    throw new Error("Já existe um produto com esse id");
                }
            }
        }
        else {
            res.status(400);
            throw new Error("Produto deve ter um id");
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("Nome do produto deve ser uma string");
            }
        }
        else {
            res.status(400);
            throw new Error("Produto deve ter um nome");
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400);
                throw new Error("Preço do produto deve ser um número");
            }
        }
        else {
            res.status(400);
            throw new Error("Produto deve ter um preço");
        }
        if (category != undefined) {
            if (category !== "Acessórios" &&
                category !== "Roupas" &&
                category !== "Eletrônicos") {
                res.status(400);
                throw new Error("Produto deve ter uma categoria existente");
            }
        }
        else {
            res.status(400);
            throw new Error("Produto deve ter uma categoria");
        }
        (0, database_1.createProduct)(id, name, price, category);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/purchases", (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const totalPrice = req.body.totalPrice;
        if (userId !== undefined) {
            if (typeof userId !== "string") {
                res.status(400);
                throw new Error("userId deve ser uma string");
            }
            const userExists = database_1.users.find(user => user.id === userId);
            if (!userExists) {
                res.status(404);
                throw new Error("Não há um usuário com esse id");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter um id de usuário");
        }
        if (productId !== undefined) {
            if (typeof productId !== "string") {
                res.status(400);
                throw new Error("productId deve ser uma string");
            }
            const productExists = database_1.products.find(product => product.id === productId);
            if (!productExists) {
                res.status(404);
                throw new Error("Não há um produto com esse id");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter um id de produto");
        }
        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                res.status(400);
                throw new Error("Quantidade de produtos comprados deve ser um número");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter uma quantidade de produtos comprados");
        }
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                res.status(400);
                throw new Error("Preço total da compra deve ser um número");
            }
            const product = database_1.products.find(product => product.id === productId);
            const { price } = product;
            if ((price * quantity) !== totalPrice) {
                res.status(400);
                throw new Error("Preço total da compra não condizente com quantidade e preço do produto");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter um preço total");
        }
        (0, database_1.createPurchase)(userId, productId, quantity, totalPrice);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.listen(3003, () => {
    console.log("Servidor rodando!");
});
//# sourceMappingURL=index.js.map