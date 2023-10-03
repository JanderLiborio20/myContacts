<p align="center">
  <img src="./.github/myContacts.svg" width="35%">
</p>

## 💻 Sobre o projeto

Gerencie a sua lista de contatos através da plataforma, onde é possível você fazer a inserção, a atualização ou a remoção de algum contato. Você também pode buscá-los e identificá-los por categorias!

<br>

## 👨‍💻 Tecnologias
Essas foram as tecnologias utilizadas neste projeto!

<br>

Backend:
- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)

<br>

## 🚀 Execução

**Atenção:** Instale o NodeJS e o Docker localmente em sua máquina antes de continuar com a instação!

<br>

Faça um clone desse repositório e acesse o diretório.
```bash
# Clone o Repositório
$ git clone https://github.com/dbssy/mycontacts.git
$ cd mycontacts
```

<br>

Instale os pacotes necessários para rodar o projeto, que estão dentro de suas respectivas pastas (server e web).
```bash
$ npm install
```

<br>

Rode os comandos abaixos para instalar a imagem do Postgres no Docker.
```bash
# Baixar a imagem
$ docker pull postgres

# Criar o container
$ docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

# Caso não tenha iniciado automaticamente, rode:
$ docker start pg

# Para verificar se o container está rodando, rode:
$ docker ps
```

<br>

Após colocar o container para rodar, você precisará criar o Banco de Dados e as tabelas manualmente.
```bash
# Acesse o banco de dados
$ docker exec -it pg bash

# Entre no usuário que você criou, no caso, criamos o root
$ psql -U root

# Para criar o banco de dados, cole a instrução abaixo
$ CREATE DATABASE mycontacts;

# Acesse o banco recém criado
$ \c mycontacts

# Dentro do arquivo schema.sql, você encontrará o restante das instruções 
# para criar as tabelas necessárias da nossa aplicação
```

<br>

Com todas as dependências instaladas e o docker rodando, acesse as respectivas pastas (server e web) e execute o comando abaixo para rodar a aplicação.
```bash
$ npm run dev
```
<br>

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
