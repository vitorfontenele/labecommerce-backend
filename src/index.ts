import { 
    users, 
    products, 
    queryProductsByName, 
    createProduct, 
    createPurchase, 
    createUser,
    purchases} from "./database";
import express, {Request, Response} from 'express';
import { TProduct , PRODUCT_CATEGORY } from './types';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = purchases.filter(purchase => purchase.userId === userId);
    res.status(200).send(result);
})

app.put("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const email = req.body.email as string | undefined;
    const password = req.body.password as string | undefined;

    const user = users.find(user => user.id === id);

    if (user){
        user.email = email || user.email;
        user.password = password || user.password;
    }

    res.status(200).send("Cadastro atualizado com sucesso");
})

app.delete("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex >= 0){
        users.splice(userIndex, 1);
    }
    res.status(200).send("User apagado com sucesso");
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products);
})

app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const result = products.find(product => product.id === id);
    res.status(200).send(result);
})

app.get("/purchases", (req: Request, res: Response) => {
    res.status(200).send(purchases);
})

app.get("/product/search", (req: Request, res: Response) => {
    const q = req.query.q as string // Type force
    const result : TProduct[] = queryProductsByName(q);

    res.status(200).send(result);
})

app.put("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.body.name as string | undefined;
    const price = req.body.price as number | undefined;
    const category = req.body.category as PRODUCT_CATEGORY | undefined;

    const product = products.find(product => product.id === id);

    if (product){
        product.name = name || product.name;
        product.category = category || product.category;

        product.price = isNaN(price) ? product.price : price;
    }

    res.status(200).send("Produto atualizado com sucesso!");
})

app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex >= 0){
        users.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
})

app.post("/users", (req: Request, res: Response) => {
    // const { id , email, password } = req.body;
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    createUser(id, email, password);
    
    res.status(201).send("Cadastro realizado com sucesso");
})

app.post("/products", (req: Request, res: Response) => {
    // const { id , name , price , category } = req.body;
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as PRODUCT_CATEGORY

    createProduct(id, name, price, category);

    res.status(201).send("Produto cadastrado com sucesso");
})

app.post("/purchases", (req: Request, res: Response) => {
    // const { userId , productId , quantity , totalPrice } = req.body;
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    createPurchase(userId, productId, quantity, totalPrice);

    res.status(201).send("Compra realizada com sucesso");
})

app.listen(3003, () => {
    console.log("Servidor rodando!");
});

