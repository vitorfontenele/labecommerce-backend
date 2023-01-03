import { TUser, TProduct, TPurchase } from "./types"

export const users : TUser[] = [
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

export const products : TProduct[] = [
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
]

export const purchases : TPurchase[] = [
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
]

