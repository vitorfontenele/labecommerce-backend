// funcao que verifica se o numero eh par ou impar
const oddOrEven = (number) => {
    if (number % 2 === 0){
        return "par";
    } else {
        return "ímpar";
    }
}

// funcao que gera um numero aleatorio entre 0 e (n-1)
const randomNumber = (n) => {
    return Math.floor(Math.random() * n);
}

// minha paridade
const myParity = process.argv[2];
// meu numero
const myNumber = Number(process.argv[3]);
// numero do computador (aleatorio de 1 a 10)
const numComputer = randomNumber(10) + 1;
// paridade do computador
const computerParity = myParity === "par" ? "ímpar" : "par";

// resultado
const result = numComputer + myNumber;
// resultado eh par ou impar?
const resultParity = oddOrEven(result);

// resposta ao usuario
let answ = `
Você escolheu ${myParity} e o computador escolheu ${computerParity}.
O resultado foi ${result}.
`

if (myParity === resultParity){
    answ += `Você ganhou!`
} else {
    answ += `Você perdeu!`
}

console.log(answ);




