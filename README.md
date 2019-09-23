# Rio do Campo Limpo **API**

## Stack

- Adonis
- Postgres
- CircleCI
- Heroku

## Executando localmente

- Instalar `docker` e `docker-compose`.
- Executar `docker-compose up -d` para executar os bancos de teste e desenvolvimento.
- Instalar a cli do Adonis globalmente: `npm i -g @adonisjs/cli`
  
### Servindo a aplicação

- `adonis serve --dev`

### Migrando tabelas

- `adonis migration:run`

### Inserir dados iniciais

- `adonis seed`

### Executando testes

- `adonis test`