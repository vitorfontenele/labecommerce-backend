//import { users , products , purchases } from "./database";
//console.log(users);
//console.log(products)
//console.log(purchases);

import { 
    getProductById, 
    queryProductsByName,
    createPurchase,
    getAllPurchasesFromUserId 
} from "./database";

console.log(queryProductsByName("screen"));
console.log(createPurchase("1", "1", 3, 15));

