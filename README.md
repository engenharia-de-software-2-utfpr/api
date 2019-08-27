# Rio do Campo Limpo **API**

[![CircleCI](https://circleci.com/gh/engenharia-de-software-2-utfpr/api.svg?style=svg)](https://circleci.com/gh/engenharia-de-software-2-utfpr/api)  ![GitHub issues](https://img.shields.io/github/issues-raw/engenharia-de-software-2-utfpr/api)

## Estrutura do projeto

```
├── LICENSE
├── README.md
├── jest.config.js
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── domains
    │   ├── index.js
    │   ├── report
    │   │   ├── index.js
    │   │   ├── report.controller.js
    │   │   ├── report.routes.js
    │   │   └── report.test.js
    │   └── user
    │       ├── index.js
    │       ├── user.controller.js
    │       ├── user.routes.js
    │       └── user.test.js
    |       ...
    ├── env.js
    ├── models
    │   ├── Report.js
    │   └── index.js
    |   ...
    ├── server.js
    └── utils
        ├── mongoose.js
        └── setupTests.js         
```

## Comandos

### Executar servidor: 

`npm start`

### Executar servidor (modo desenvolvimento): 

`npm run dev`

### Executar testes:

`npm test`

### Linter: 

`npm run lint`

## Workflow

- Criar branch a partir da `master`
- 💻☕
- **Executar testes**
- **Executar linter**
- "Commitar" alterações
- Fazer push
- Criar pull request
- Esperar testes passarem
- Designar revisores
- Esperar revisor aprovar
- Fazer merge com a `master`
- Excluir branch
