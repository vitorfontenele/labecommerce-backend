"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
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
        name: "Soda Can",
        price: 5,
        category: "Beverage"
    },
    {
        id: "2",
        name: "Pork Filet",
        price: 15,
        category: "Meat"
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
//# sourceMappingURL=database.js.map