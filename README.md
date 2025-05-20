
# **Projeto de Agendamentos 📅**

Bem-vindo ao projeto de agendamentos! Este projeto foi desenvolvido utilizando **React** e **JSON Server** para simular uma API local. Com ele, você pode criar, editar e gerenciar agendamentos de forma eficiente.

## **Pré-requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) (v16 ou superior recomendado)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [JSON Server](https://github.com/typicode/json-server)

---

## **Instalação**

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/alencastroP/agendamentos-liga.git
   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd agendamentos-liga
   ```

3. **Instale as dependências necessárias:**
   ```bash
   npm install
   ```

4. **Instale o JSON Server globalmente, caso ainda não tenha instalado:**
   ```bash
   npm install -g json-server
   ```

---

## **Uso**

1. **Inicialize o servidor JSON para simular a API:**
   ```bash
   json-server --watch db.json
   ```
   Isso criará um servidor local rodando em `http://localhost:3000`.

2. **Abra o projeto React em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O projeto estará disponível em `http://localhost:5173` (ou outra porta configurada pelo Vite).

---

## **Estrutura do Projeto**

- **`db.json`**: Arquivo que armazena os dados simulados (agenda, usuários, etc.).
- **`src`**: Contém os arquivos do projeto React, incluindo componentes, páginas e estilos.

---

## **Tecnologias Utilizadas**

O projeto utiliza as seguintes tecnologias:

- **React**: Biblioteca para construção da interface de usuário.
- **React Router**: Para gerenciamento de rotas na aplicação.
- **Styled-Components**: Para estilização com CSS-in-JS.
- **Axios**: Para realizar requisições HTTP de forma simplificada.
- **Vite**: Ferramenta de build e desenvolvimento rápido.
- **JSON Server**: Simulador de API REST para dados locais.

---

## **Comandos Disponíveis**

- `npm install`: Instala as dependências do projeto.
- `npm run dev`: Inicia o projeto em modo de desenvolvimento.
- `npm run build`: Gera os arquivos para produção.
- `npm run preview`: Visualiza a versão de produção localmente.

---

## **Como Utilizar**

- **Configuração de Rotas**: As rotas são gerenciadas com o `React Router`, localizado no arquivo principal de rotas.
- **Estilização**: Todos os estilos são aplicados utilizando `Styled-Components`. Personalize facilmente as interfaces alterando os estilos diretamente nos componentes.
- **Requisições HTTP**: As interações com a API local (ou remota) são feitas utilizando o `Axios`. Configure endpoints no arquivo de configuração padrão.

---

## 🐳 Instruções para Executar o Projeto com Docker

Se você deseja executar o projeto utilizando Docker, siga as instruções abaixo:

---

### 1. Instalar o Docker

Certifique-se de que o Docker está instalado em sua máquina. Caso contrário, faça o download e instale-o a partir do [site oficial do Docker](https://www.docker.com/).

---

### 2. Construir a Imagem Docker

Abra um terminal na raiz do seu projeto e execute o seguinte comando para construir a imagem Docker:

```bash
docker-compose build
```

---

### 3. Executar o Contêiner

Após a construção da imagem, inicie o contêiner com o comando:

```bash
docker-compose up
```

---

### 4. Acessar o Aplicativo

Com o contêiner em execução, abra o navegador e acesse:

```
http://localhost:3000
```

Você verá o aplicativo React em execução.

---

### 5. Parar o Contêiner

Para parar o contêiner, pressione `Ctrl + C` no terminal onde o comando `docker-compose up` está em execução.

Se quiser remover os contêineres, execute:

```bash
docker-compose down
```

---

Agora você está pronto para rodar o projeto com Docker!

Agradeço desde já pela atenção, qualquer dúvidas me contatar em: pedrovalencastro@outlook.com
