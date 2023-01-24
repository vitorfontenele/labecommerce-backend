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
        const result = yield (0, knex_1.db)("users");
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
}));
app.get("/users/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield (0, knex_1.db)("purchases").where({ buyerId: userId });
        if (result.length < 1) {
            res.status(404);
            throw new Error("Nenhuma compra entrada");
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
}));
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
        const result = yield (0, knex_1.db)("products");
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [result] = yield knex_1.db.raw(`SELECT * FROM products
            WHERE id = "${id}"`);
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
}));
app.get("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw("SELECT * FROM purchases;");
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
}));
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
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
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
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("Nome do user deve ser uma string");
            }
        }
        else {
            res.status(400);
            throw new Error("User precisa ter um nome");
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
        yield knex_1.db.raw(`
            INSERT INTO users(id, name, email, password) VALUES
            ("${id}", "${name}", "${email}", "${password}");
        `);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
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
        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400);
                throw new Error("Descrição do produto deve ser uma string");
            }
        }
        else {
            res.status(400);
            throw new Error("Produto deve ter uma descrição");
        }
        if (imageUrl !== undefined) {
            if (typeof imageUrl !== "string") {
                res.status(400);
                throw new Error("URL da imagem deve ser uma string");
            }
        }
        else {
            res.status(400);
            throw new Error("Produto deve ter uma URL de imagem");
        }
        if (category != undefined) {
            if (category !== "Acessories" &&
                category !== "Clothes and Shoes" &&
                category !== "Electronics") {
                res.status(400);
                throw new Error("Produto deve ter uma categoria existente");
            }
        }
        else {
            res.status(400);
            throw new Error("Produto deve ter uma categoria");
        }
        yield knex_1.db.raw(`
            INSERT INTO products(id, name, price, description, imageUrl, category) VALUES 
            ("${id}", "${name}", "${price}", "${description}", "${imageUrl}", "${category}")
        `);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const buyerId = req.body.buyerId;
        const totalPrice = req.body.totalPrice;
        const paid = req.body.paid;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("id deve ser uma string");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter um id");
        }
        if (buyerId !== undefined) {
            if (typeof buyerId !== "string") {
                res.status(400);
                throw new Error("buyerId deve ser uma string");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter um id de usuário");
        }
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                res.status(400);
                throw new Error("Preço total da compra deve ser um número");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter um preço total");
        }
        if (paid !== undefined) {
            if (typeof paid !== "number") {
                res.status(400);
                throw new Error("Status de pago deve ser um número");
            }
        }
        else {
            res.status(400);
            throw new Error("Compra deve ter um status de pago");
        }
        yield knex_1.db.raw(`INSERT INTO purchases(id, buyerId, totalPrice, paid) VALUES
            ("${id}", "${buyerId}", "${totalPrice}", "${paid}")`);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [result] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (!result) {
            res.status(404);
            throw new Error("Compra não encontrada");
        }
        const [user] = yield (0, knex_1.db)("users").where({ id: result.buyerId });
        result["name"] = user.name;
        result["email"] = user.email;
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.listen(3003, () => {
    console.log("Servidor rodando!");
});
//# sourceMappingURL=index.js.map