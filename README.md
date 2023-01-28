<a name="readme-top"></a>

<!-- Conteúdo -->
<details>
  <summary>Conteúdo</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#feito-com">Feito com</a></li>
      </ul>
    </li>
    <li>
      <a href="#instalação">Instalação</a>
    </li>
    <li><a href="#utilização">Utilização</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- SOBRE O PROJETO -->
## Sobre o projeto

Este projeto é um exemplo de um Back-End para uma loja virtual. 

O banco de dados utilizado é o SQLite e a API foi construída usando o framework Express do Node JS. Este repositório é um exemplo de como construir uma estrutura de Back-End para uma aplicação de comércio eletrônico e pode ser usado como base para projetos futuros.

Este projeto é parte dos projetos realizados como atividade durante o bootcamp da Labenu.

Os conteúdos principais trabalhados nesse projeto são:

- Integração com Banco de Dados
- Métodos HTTP
- Construção e manipulação de APIs
- CRUD

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

### Feito com


* [![Typescript][typescript-shield]][typescript-url]
* [![Node][node-shield]][node-url]
* [![Express][express-shield]][express-url]
* [![SQLite][sqlite-shield]][sqlite-url]

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- INSTALAÇÃO -->
## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/vitorfontenele/labecommerce-backend.git
   ```
2. Instale os pacotes NPM:
   ```sh
   npm install
   ```
3. Para executar o projeto em modo de desenvolvimento:
   ```sh
   npm run dev
   ```
   
<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- EXEMPLOS DE REQUISIÇÕES -->
## Exemplos de Requisições

Seguem exemplos de como utilizar a API criada neste projeto. 

Inclui exemplos de requisições HTTP para as operações CRUD (Criar, Ler, Atualizar e Deletar) para as tabelas de usuários, produtos e compras.

### Get all users

```typescript
// Request
// GET /users
// Response
// status 200 OK
[
    {
        id: "u001",
        name: "John Smith",
        email: "johnsmith@gmail.com",
        password: "Pass1",
        createdAt: "2023-01-26 23:49:33"
    },
    {...},
    {
        id: "u009",
        name: "Andrew Gonzalez",
        email: "andrewgonzalez@gmail.com",
        password: "SecP@s2",
        createdAt: "2023-01-26 23:49:33"
    }
]
```

### Create user

```typescript
// Request
// POST /users
// body JSON
{
    "id": "u010",
    "name": "Daniel Henderson",
    "email": "danielhenderson@gmail.com",
    "password": "passw00"
}
// Response
// status 201 CREATED
{
    message: "Cadastro realizado com sucesso",
    user: {
      id: "u010",
      name: "Daniel Henderson",
      email: "danielhenderson@gmail.com",
      password: "passw00"
    }
}
```

### Create product

```typescript
// Request
// POST /products
// body JSON
{
    "id": "prod010",
    "name": "Joystick",
    "price": 150,
    "description": "Ultimate gaming experience.",
    "imageUrl": "https://dummy.com/joystick.jpg",
    "category": "Electronics"
}
// Response
// status 201 CREATED
{
    message: "Produto cadastrado com sucesso",
    product: {
      id: "prod010",
      name: "Joystick",
      price: 150,
      description: "Ultimate gaming experience.",
      imageUrl: "https://dummy.com/joystick.jpg",
      category: "Electronics"
    } 
}
```

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>
 
 <!-- CONTATO -->
 ## Contato

[![Github][github-shield]][github-url][![Linkedin][linkedin-shield]][linkedin-url]

Link do Projeto: [https://github.com/vitorfontenele/projeto-react-apis](https://github.com/vitorfontenele/projeto-react-apis)

<p align="right">(<a href="#readme-top">voltar para o topo</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[typescript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white 
[typescript-url]: https://www.typescriptlang.org/
[node-shield]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/
[express-shield]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://www.npmjs.com/package/express
[sqlite-shield]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[sqlite-url]: https://sqlite.org/
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/vitor-fontenele/
[github-shield]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/vitorfontenele

