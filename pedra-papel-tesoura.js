// funcao que gera um numero aleatorio entre 0 e (n-1)
const randomNumber = (n) => {
    return Math.floor(Math.random() * n);
}

// escolha do usuario
const myChoice = process.argv[2];
// possiveis escolhas
const choices = ["pedra", "papel", "tesoura"];
// numero de possiveis escolhas
const numberOfChoices = choices.length;
// escolha do computador
const computerChoice = choices[randomNumber(numberOfChoices)];

// resposta
let answ = `
Você escolheu ${myChoice} e o computador escolheu ${computerChoice}.
`;

// if ... else para ver quem foi o vencedor
if (myChoice === 'pedra' && computerChoice === 'tesoura') {
    answ += "Você ganhou!";
  } else if (myChoice === 'papel' && computerChoice === 'pedra') {
    answ += "Você ganhou!";
  } else if (myChoice === 'tesoura' && computerChoice === 'papel') {
    answ += "Você ganhou!";
  } else if (computerChoice === 'pedra' && myChoice === 'tesoura') {
    answ += "Você perdeu!";
  } else if (computerChoice === 'papel' && myChoice === 'pedra') {
    answ += "Você perdeu!";
  } else if (computerChoice === 'tesoura' && myChoice === 'papel') {
    answ += "Você perdeu!";
  } else {
    answ += "Empate!";
  }

  console.log(answ);