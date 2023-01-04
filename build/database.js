"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "1",
        email: "johndoe@mail.com",
        password: "123"
    },
    {
        id: "2",
        email: "ronjoe@mail.com",
        password: "456"
    }
];
exports.products = [
    {
        id: "1",
        name: "Sunscreen",
        price: 5,
        category: types_1.PRODUCT_CATEGORY.ACCESSORIES
    },
    {
        id: "2",
        name: "Sneakers",
        price: 15,
        category: types_1.PRODUCT_CATEGORY.CLOTHES_AND_SHOES
    }
];
exports.purchases = [
    {
        userId: "1",
        productId: "1",
        quantity: 1,
        totalPrice: 5
    },
    {
        userId: "1",
        productId: "2",
        quantity: 2,
        totalPrice: 30
    }
];
function createUser(id, email, password) {
    exports.users.push({
        id,
        email,
        password
    });
    return ("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({
        id,
        name,
        price,
        category
    });
    return ("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(id) {
    return exports.products.find(product => product.id === id);
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchases.push({
        userId,
        productId,
        quantity,
        totalPrice
    });
    return ("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.purchases.filter(purchase => purchase.userId === userIdToSearch);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map