import { 
    users, 
    products, 
    queryProductsByName, 
    createProduct, 
    createPurchase, 
    createUser,
    purchases} from "./database";
import express, {Request, Response} from 'express';
import { PRODUCT_CATEGORY } from './types';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(users);
    } catch (error : any) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }   
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const result = purchases.filter(purchase => purchase.userId === userId);

        if (!result){
            res.status(404);
            throw new Error ("Compra não encontrada");
        }

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;

        const user = users.find(user => user.id === id);

        if (!user) {
            res.status(404);
            throw new Error ("Usuário não encontrado");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("Email deve ser uma string");
            }
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Senha deve ser uma string");
            }
        }

        // Atualização dos dados
        user.email = email || user.email;
        user.password = password || user.password;

        res.status(200).send("Cadastro atualizado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
    
})

app.delete("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex >= 0){
            users.splice(userIndex, 1);
        } else {
            res.status(404);
            throw new Error ("Usuário não encontrado");
        }
        res.status(200).send("User apagado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }  
})

app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(products);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
})

app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = products.find(product => product.id === id);
        
        if (!result){
            res.status(404);
            throw new Error ("Produto não encontrado");
        }

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }   
})

app.get("/purchases", (req: Request, res: Response) => {
    res.status(200).send(purchases);
})

app.get("/product/search", (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;

        if (q !== undefined){
            if (q.length < 1){
                res.status(400);
                throw new Error ("'q' deve possuir ao menos um caracter");
            }
        } else {
            res.status(400);
            throw new Error ("'q' precisa ser definido");
        }
        const result = queryProductsByName(q);

        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
    
})

app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;

        const product = products.find(product => product.id === id);

        if (!product){
            res.status(404);
            throw new Error ("Produto não encontrado");
        }

        if (name !== undefined){
            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("Nome do produto deve ser uma string");
            }
        }

        if (price !== undefined){
            if (typeof price !== "number"){
                res.status(400);
                throw new Error ("Preço do produto deve ser um número");
            }
        }

        if (category !== undefined){
            if (
                category !== "Acessórios" &&
                category !== "Roupas" &&
                category !== "Eletrônicos"
            ){
                res.status(400);
                throw new Error ("Categoria deve ser uma das existentes");
            }
        }

        // Atualizando os dados
        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;

        res.status(200).send("Produto atualizado com sucesso!");
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex >= 0){
            users.splice(productIndex, 1);
        } else {
            res.status(404);
            throw new Error ("Produto não encontrado");
        }
        res.status(200).send("Produto apagado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }  
})

app.post("/users", (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;

        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("Id do user deve ser uma string");
            }

            // Nao pode haver repeticao de id
            for (let i = 0; i < users.length; i++){
                if (users[i].id === id){
                    res.status(400);
                    throw new Error ("Já existe um user com esse id");
                }
            }
        } else {
            res.status(400);
            throw new Error ("User precisa ter um id");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("Email do user deve ser uma string");
            }

            // Nao pode haver repeticao de email
            for (let i = 0; i < users.length; i++){
                if (users[i].email === email){
                    res.status(400);
                    throw new Error ("Já existe um user com esse email");
                }
            }
        } else {
            res.status(400);
            throw new Error ("User precisa ter um email");
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Password do user deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("User precisa ter um password");
        }

        createUser(id, email, password);
        
        res.status(201).send("Cadastro realizado com sucesso"); 

    } catch (error) {

        console.log(error);

        if (res.statusCode === 200){
            res.status(500);
        }

        res.send(error.message);
    }

})

app.post("/products", (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category as PRODUCT_CATEGORY

        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("Id deve ser uma string");
            }

            // Id do produto nao pode se repetir
            for (let i = 0; i < products.length; i++){
                if (products[i].id === id){
                    res.status(400)
                    throw new Error ("Já existe um produto com esse id");
                }
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter um id");
        }

        if (name !== undefined){
            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("Nome do produto deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter um nome"); 
        }

        if (price !== undefined){
            if (typeof price !== "number"){
                res.status(400);
                throw new Error ("Preço do produto deve ser um número");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter um preço"); 
        }

        if (category != undefined){
            if (
                category !== "Acessórios" &&
                category !== "Roupas" &&
                category !== "Eletrônicos"
            ){
                res.status(400);
                throw new Error ("Produto deve ter uma categoria existente");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter uma categoria");
        }

        createProduct(id, name, price, category);

        res.status(201).send("Produto cadastrado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

app.post("/purchases", (req: Request, res: Response) => {
    try {
	    const userId = req.body.userId;
	    const productId = req.body.productId;
	    const quantity = req.body.quantity;
	    const totalPrice = req.body.totalPrice;

        if (userId !== undefined){
            if (typeof userId !== "string"){
                res.status(400);
                throw new Error ("userId deve ser uma string");
            }

            // Id do usuario deve existir
            const userExists = users.find(user => user.id === userId);
            if (!userExists){
                res.status(404);
                throw new Error ("Não há um usuário com esse id");
            }
            
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um id de usuário");
        }

        if (productId !== undefined){
            if (typeof productId !== "string"){
                res.status(400);
                throw new Error ("productId deve ser uma string");
            }

            // Id do produto deve existir
            const productExists = products.find(product => product.id === productId);
            if (!productExists){
                res.status(404);
                throw new Error ("Não há um produto com esse id");
            }

        } else {
            res.status(400);
            throw new Error ("Compra deve ter um id de produto");
        }

        if (quantity !== undefined){
            if (typeof quantity !== "number"){
                res.status(400);
                throw new Error ("Quantidade de produtos comprados deve ser um número");
            }
        } else {
            res.status(400);
            throw new Error ("Compra deve ter uma quantidade de produtos comprados");
        }

        if (totalPrice !== undefined){
            if (typeof totalPrice !== "number"){
                res.status(400);
                throw new Error ("Preço total da compra deve ser um número");
            }

            // Total price deve ser condizente com quantidade e preço do produto
            const product = products.find(product => product.id === productId);
            const { price } = product;
            if ((price * quantity) !== totalPrice){
                res.status(400);
                throw new Error ("Preço total da compra não condizente com quantidade e preço do produto");
            }
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um preço total");
        }
	
	    createPurchase(userId, productId, quantity, totalPrice);
	
	    res.status(201).send("Compra realizada com sucesso");

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

app.listen(3003, () => {
    console.log("Servidor rodando!");
});