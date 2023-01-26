export type TUser = {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
    category: PRODUCT_CATEGORY
}

export type TPurchaseProduct = {
    purchaseId: string
    productId: string
    quantity: number
}

export type TPurchase = {
    id: string
    buyer: string
    totalPrice: number
    createdAt: string
    paid: number
}

export enum PRODUCT_CATEGORY {
    ACCESSORIES = "Acessories",
    CLOTHES_AND_SHOES = "Clothes and Shoes",
    ELECTRONICS = "Electronics"
}