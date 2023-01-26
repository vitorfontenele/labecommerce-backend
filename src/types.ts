export type TUser = {
    id: string
    email: string
    password: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
    category: PRODUCT_CATEGORY
}

export type TProductOnPurchase = {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
    category: PRODUCT_CATEGORY
    quantity: number
}

export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}

export enum PRODUCT_CATEGORY {
    ACCESSORIES = "Acessories",
    CLOTHES_AND_SHOES = "Clothes and Shoes",
    ELECTRONICS = "Electronics"
}