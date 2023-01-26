export type TUserDB = {
    id: string
    name: string
    email: string
    password: string
    created_at: string
}

export type TProductDB = {
    id: string
    name: string
    price: number
    description: string
    image_url: string
    category: PRODUCT_CATEGORY
}

export type TPurchaseProductDB = {
    purchase_id: string
    product_id: string
    quantity: number
}

export type TPurchaseDB = {
    id: string
    buyer: string
    total_price: number
    created_at: string
    paid: number
}

export enum PRODUCT_CATEGORY {
    ACCESSORIES = "Acessories",
    CLOTHES_AND_SHOES = "Clothes and Shoes",
    ELECTRONICS = "Electronics"
}