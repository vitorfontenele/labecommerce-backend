import { 
    users, 
    products
} from "./database";
import express, {Request, Response} from 'express';
import { PRODUCT_CATEGORY } from './types';
import cors from 'cors';
import { db } from "./database/knex";
import { 
    passwordRegex,
    emailRegex
 } from "./regex";

const app = express();
app.use(express.json());
app.use(cors());

// Get all users
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db("users");
        const output = result.map(({ id, name, email, password, created_at }) => ({
            id,
            name,
            email,
            password,
            createdAt: created_at
        }));
        res.status(200).send(output);
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }   
});

// Create user
app.post("/users", async (req: Request, res: Response) => {
    try {
        // destructuring para pegar info que vem do body
        const {id, name, email, password} = req.body;

        // id precisa existir e ser uma string
        if (typeof id !== "string"){
            res.status(400);
            throw new Error ("'id' deve existir e ser uma string");
        }
        // user precisa ter id único
        const idExists = await db("users").where({id: id});
        if (idExists.length > 0){
            res.status(400);
            throw new Error ("Já existe um usuário com esse 'id'");
        }
        // id do user precisa ter no mínimo 4 caracteres
        if (id.length < 4){
            res.status(400);
            throw new Error ("'id' precisa ter no mínimo 4 caracteres");
        }

        // name precisa existir e ser uma string
        if (typeof name !== "string"){
            res.status(400);
            throw new Error ("'name' deve existir e ser uma string"); 
        }
        // name precisa ter no mínimo 2 caracteres
        if (name.length < 2){
            res.status(400);
            throw new Error ("'name' precisa ter no mínimo 2 caracteres");
        }

        // email precisa existir e ser uma string
        if (typeof email !== "string"){
            res.status(400);
            throw new Error ("'email' deve existir e ser uma string");
        }
        // email precisa ser único
        const emailExists = await db("users").where({email: email});
        if (emailExists.length > 0){
            res.status(400);
            throw new Error ("Já existe um usuário com esse 'email'");
        }
        // email deve ter formato de email
        if (!emailRegex.test(email)){
            res.status(400);
            throw new Error ("'email' deve ter formato de e-mail");
        }

        // password precisa existir e ser uma string
        if (typeof password !== "string"){
            res.status(400);
            throw new Error ("'password' deve existir e ser uma string");
        }
        // password deve ter entre 4 e 8 dígitos e incluir pelo menos um dígito numérico
        if (!passwordRegex.test(password)){
            res.status(400);
            throw new Error ("password deve ter entre 4 e 8 dígitos e incluir pelo menos um dígito numérico");
        }

        // novo usuário a ser inserido
        const newUser = {
            id,
            name, 
            email, 
            password
        }

        // query para inserir o novo usuário
        await db("users").insert(newUser);
        
        res.status(201).send({
            message: "Cadastro realizado com sucesso",
            user: newUser
        }); 
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
});

// Create product
app.post("/products", async (req: Request, res: Response) => {
    try {
        // destructuring para pegar info que vem do body
        const {id, name, price, description, image_url} = req.body;
        const category = req.body.category as PRODUCT_CATEGORY;

        // id precisa existir e ser uma string
        if (typeof id !== "string"){
            res.status(400);
            throw new Error ("'id' deve existir e ser uma string");
        }
        // product precisa ter id único
        const idExists = await db("products").where({id: id});
        if (idExists.length > 0){
            res.status(400);
            throw new Error ("Já existe um 'product' com esse 'id'");
        }
        // id do product precisa ter no mínimo 7 caracteres
        if (id.length < 7){
            res.status(400);
            throw new Error ("'id' precisa ter no mínimo 7 caracteres");
        }

        // name precisa existir e ser uma string
        if (typeof name !== "string"){
            res.status(400);
            throw new Error ("'name' deve existir e ser uma string"); 
        }
        // name precisa ter no mínimo 2 caracteres
        if (name.length < 2){
            res.status(400);
            throw new Error ("'name' precisa ter no mínimo 2 caracteres");
        }

        // price precisa existir e ser um number
        if (typeof price !== "number"){
            res.status(400);
            throw new Error ("'price' deve existir e ser um number");
        }
        // price precisa ser maior do que zero
        if (price <= 0){
            res.status(400);
            throw new Error ("'price' deve ser maior do que zero");
        }

        // description precisa existir e ser uma string
        if (typeof description !== "string"){
            res.status(400);
            throw new Error ("'description' deve existir e ser uma string");
        }
        // description precisa ter no mínimo 2 caracteres
        if (description.length < 2){
            res.status(400);
            throw new Error ("'description' deve ter no mínimo 2 caracteres");
        }

        // image_url precisa existir e ser uma string
        if (typeof image_url !== "string"){
            res.status(400);
            throw new Error ("'image_url' deve existir e ser uma string");
        }
        // URLs podem ter muitos formatos. Fica pendente ver se vale alguma outra verificação

        // category precisa existir e ser uma string
        if (typeof category !== "string"){
            res.status(400);
            throw new Error ("'category' deve existir e ser uma string");
        }
        // produto deve ter uma das categorias existentes
        if (
            category !== "Acessories" &&
            category !== "Clothes and Shoes" &&
            category !== "Electronics"
        ){
            res.status(400);
            throw new Error ("Produto deve ter uma categoria existente");
        }
        
        // novo produto a ser inserido
        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl: image_url,
            category
        };

        // query para inserir o novo produto
        await db("products").insert(newProduct);

        res.status(201).send({
            message: "Produto cadastrado com sucesso",
            product: newProduct
        });
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
});

// Get All Products (funcionalidades 1 e 2)
app.get("/products", async (req: Request, res: Response) => {
    try {
        // possível query param
        const { q } = req.query;

        // variavel para armazenar a busca
        let result;

        if (q === undefined){
            // Quando não houver query params
            result = await db("products");
        } else {
            // Quando houver query params
            result = await db("products").where("name", "LIKE", `%${q}%`);
        }

        // Substituindo snake_case por camelCase
        const output = result.map(({id, name, price, description, image_url, category}) => ({
            id,
            name,
            price,
            description,
            imageUrl: image_url,
            category
        }))

        res.status(200).send(output);
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

// Edit Product by Id
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
});

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        // const result = purchases.filter(purchase => purchase.userId === userId);

        const result = await db("purchases").where({buyerId: userId});

        if (result.length < 1){
            res.status(404);
            throw new Error ("Nenhuma compra entrada");
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

app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // const result = products.find(product => product.id === id);

        const [result] = await db.raw(
            `SELECT * FROM products
            WHERE id = "${id}"`
        );

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

app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(
            "SELECT * FROM purchases;"
        )
        res.status(200).send(result);    
    } catch (error : any) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    } 
})

app.get("/product/search", async (req: Request, res: Response) => {
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
        // const result = queryProductsByName(q);
        const product = await db.raw(`
            SELECT * FROM products
            WHERE name LIKE('%${q}%');
        `)

        res.status(200).send(product);
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

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
	    const buyerId = req.body.buyerId;
	    const totalPrice = req.body.totalPrice;
        const paid = req.body.paid;

        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("id deve ser uma string");
            }

            // Id da compra nao pode se repetir
            // Implementar depois
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um id");
        }

        if (buyerId !== undefined){
            if (typeof buyerId !== "string"){
                res.status(400);
                throw new Error ("buyerId deve ser uma string");
            }

            // Id do usuario deve existir
            // const userExists = users.find(user => user.id === buyerId);
            // if (!userExists){
            //     res.status(404);
            //     throw new Error ("Não há um usuário com esse id");
            // }
            
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um id de usuário");
        }

        if (totalPrice !== undefined){
            if (typeof totalPrice !== "number"){
                res.status(400);
                throw new Error ("Preço total da compra deve ser um número");
            }
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um preço total");
        }

        if (paid !== undefined){
            if (typeof paid !== "number"){
                res.status(400);
                throw new Error ("Status de pago deve ser um número");
            }
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um status de pago");
        }
	
	    // createPurchase(userId, productId, quantity, totalPrice);

        await db.raw(
            `INSERT INTO purchases(id, buyerId, totalPrice, paid) VALUES
            ("${id}", "${buyerId}", "${totalPrice}", "${paid}")`
        )
	
	    res.status(201).send("Compra realizada com sucesso");

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const [result] = await db("purchases").where({id: id});

        if (!result){
            res.status(404);
            throw new Error ("Compra não encontrada");
        }

        const [user] = await db("users").where({id: result.buyerId});
        result["name"] = user.name;
        result["email"] = user.email;

        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
});

app.listen(3003, () => {
    console.log("Servidor rodando!");
});