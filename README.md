<p align="center">
  <img src="https://user-images.githubusercontent.com/101602651/235329838-5551ffdc-da65-4514-86d7-67bcaef750a7.svg" id="cover-image" alt="Logo" />  
</p>

---

<div id='introducao'>

O **MyContacts** é uma aplicação voltada para cadastrar e gerenciar contatos
no geral. Esse projeto foi desenvolvido utilizando o mínimo de pacotes e bilbiotecas possíveis, dando foco em utilizar o React e JavaScript.

Futuramente irei acrescentar novas funcionalidades que você pode conferir no [Roadmap](#roadmap).

</div>

## Tópicos

- [Introdução](#introducao)
- [Instalar e rodar o projeto localmente](#instalacao)
- [Stack utilizada](#stack_utilizada)
- [Demonstração](#demonstração)
- [Roadmap](#roadmap)
- [Aprendizados](#aprendizados)
- [Status](#status)
- [Contatos](#contatos)

<div id='instalacao'>

## Instalando e rodando o projeto localmente:

Para rodar o **MyContacts** em sua máquina é bem simples.

Você precisa ter instalado:

- Node.js v16
- Docker v4.17.1 e utilizar a imagem Postgres (https://hub.docker.com/_/postgres)
- Yarn ou NPM para a instalação dos pacotes (projeto desenvolvido com Yarn)

Para a instalação dos pacotes você deve entrar em cada pasta individualmente
e rodar o comando `yarn install`, pois neste projeto temos o _backend_ e o _frontend_.

Navegue para `../api` e rode no terminal o comando:

```bash
yarn install
```

Repita esse passo para `../frontEnd`.

### Rotas

Lembre-se de alterar as rotas da aplicação nos arquivos:

<div>
	
`\api\src\index.js` altere o valor de `app.listen()` para a porta que você deseja que o banco rode.

`\api\src\app\middlewares\cors.js` altere o valor da variável `allowedOrigins` para a rote em que o seu _frontend_ vai rodar.

`\frontEnd\src\services\CategoriesService\index.js` altere o valor do `constructor()` com o mesmo endereço do seu _backend_.

`\frontend\src\services\ContactsService\index.js` altere o valor do `constructor()` com o mesmo endereço do seu _backend_.

</div>

</div>

E mais um detalhe, a porta padrão do _frontend_ foi definida para `:3001`, e do _backend_ para `:3000`.

Pronto, agora você está preparado para utilizar esta aplicação.
Para iniciar o _backend_ basta rodar `yarn dev` ou `yarn docker` caso o processo do Docker esteja parado no Windows, em sua respectiva pasta.
E para iniciar o _frontend_ basta rodar `yarn start` em sua respectiva pasta.

</div>

<div id='stack_utilizada'>
<h2>Stack utilizada</h2>

**Front-end:**

<ul id="frontend-stack">
	<li>React</li>
	<li>Styled-Components</li>
	<li>PropTypes</li>
	<li>Cross-Env</li>
</ul>

**Back-end:**

<ul id="backend-stack">
	<li>Node.js</li>
	<li>Express</li>
	<li>Docker</li>
	<li>Postgres</li>
</ul>

> Em ambos foram utilizados o EditorConfig e Eslint para o desenvolvimento.

</div>

<div id='demonstração'>
<h2>Demonstração</h2>

Ao entrar na aplicação pela primeira vez, você se encontra-rá na página Home e verá a mensagem indicando a lista vazia de contatos.

1. Na tela inicial você poderá clica no botão "Novo Contato" para que você seja redirecionado a página de criação de contato.

<p align="center">
  <img width="800" height="450" src="https://github-production-user-asset-6210df.s3.amazonaws.com/78622036/279525194-8155e13d-5270-4faf-a445-cdc77e398125.png"/>  
</p>

2. Logo em seguida basta preencher os campos com os dados do contato e selecionar uma categoria (se houver).

<p align="center">
  <img width="800" height="450" src="https://github.com/JanderLiborio20/myContacts/assets/78622036/44c95ace-4101-400e-b0bb-07da45a983b8"/>  
</p>

3. Em campos obrigatorios ficar vermelho caso seja preenchido.

<p align="center">
  <img width="800" height="450" src="https://github-production-user-asset-6210df.s3.amazonaws.com/78622036/279525518-d0548cc7-b660-401b-923b-5283c71c3f70.png"/>  
</p>

4. Após clicar em "Cadastrar Contato" você poderá continar cadastrandos novos contatos ou clicar em "Voltar",
   para ser redirecionado à página Home onde verá a sua lista atualizada com cada contato cadastrado.

5. Em cada card de contato você poderá clicar nos botões ha direta para editar ou excluir o contato selecionado.

<p align="center">
  <img width="800" height="450" src="https://github-production-user-asset-6210df.s3.amazonaws.com/78622036/279525528-9dfe63c3-9f6c-457e-bb8b-69c021aaff17.png"/>  
</p>

6. Na página Home você poderá filtrar os contatos por **nome**, **ordem alfabética** e ou **categoria**.

<p align="center">
  <img width="800" height="450" src="https://github-production-user-asset-6210df.s3.amazonaws.com/78622036/279525537-42250787-4125-4922-be74-a3994aedc9b2.png"/>  
</p>

</div>

<div id='aprendizados'>
<h2>Aprendizados</h2>

Neste projeto aprendemos a utilizar muito bem o _React_, e principalmente a técnica de _Prop Drilling_ utilizando o pacote "Prop-Types",
como podemos ver neste trecho de código do componente `<ContactsList />` que exibe a lista de contatos na página **Home**:

```javascript
\frontend\src\pages\Home\components\ContactsList\index.js

  ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onToggleOrderByCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  isLoadingCategories: PropTypes.bool.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};
```

Além disso o uso de _Styled-Components_ se faz presente durante todas as etapas de estilização deste projeto, como podemos ver aqui:

```javascript
\frontend\src\pages\Home\components\ContactsList\styles.js

import styled from 'styled-components';

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;
  display: flex;

  /* ...Resto do código */
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  /* ...Resto do código */
`;
```

Vale lembrar também da criação das rotas utilizando o `node:path`, `express` e `react-router-dom`.

</div>
