# 📰 Projeto Hackathon

Este repositório contém um sistema completo para gerenciamento e exibição de notícias, desenvolvido com **Node.js, Express, MongoDB** no backend e **React (Vite) com Bootstrap** no frontend.

---

## 📌 Funcionalidades

- Listagem de notícias no site principal.
- Administração de notícias (CRUD) em uma interface separada.
- Confirmação antes de adicionar, editar ou excluir uma notícia.
- Layout responsivo e moderno com Bootstrap.
- Backend estruturado com Express e MongoDB.

---

## 🛠️ Tecnologias Utilizadas

### **Backend**

- **Node.js**
- **Express.js**
- **MongoDB (Atlas)**
- **Mongoose**
- **CORS**
- **Dotenv**

### **Frontend**

- **React.js (Vite)**
- **React-Bootstrap**
- **React-Router-Dom**
- **CSS personalizado**

---

## 🚀 Como Executar o Projeto

### 🔹 **Clonando o Repositório**

```sh
$ git clone https://github.com/seu-usuario/hackanews.git
$ cd hackanews
```

### 🔹 **Configurando o Backend**

1. Acesse a pasta do backend:
   ```sh
   $ cd hackanews
   ```
2. Instale as dependências:
   ```sh
   $ npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo **.env** e adicione a string de conexão do MongoDB:
   ```env
   DB_CONNECTION_STRING=mongodb+srv://seu_usuario:senha@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
4. Execute o backend:
   ```sh
   $ npm run dev
   ```
   O backend estará rodando em **[http://localhost:3000](http://localhost:3000)**.

### 🔹 **Configurando o Frontend**

1. Acesse a pasta do frontend:
   ```sh
   $ cd hackafront
   ```
2. Instale as dependências:
   ```sh
   $ npm install
   ```
3. Execute o frontend:
   ```sh
   $ npm run dev
   ```
   O frontend estará rodando em **[http://localhost:5173](http://localhost:5173)**.

---

## 🌍 Estrutura do Projeto

📁 HACKA (Raiz do projeto)

- 📁 **src**
  - 📁 **config**
    - `dbConnect.js` → Conexão com MongoDB.
  - 📁 **controllers**
    - `articleController.js` → Controlador das notícias (CRUD).
  - 📁 **models**
    - `Article.js` → Schema do Mongoose para as notícias.
  - 📁 **routes**
    - `articlesRoutes.js` → Rotas da API.
    - `index.js` → Agrupamento das rotas.
  - `app.js` → Configuração principal do backend.
  - `server.js` → Inicializa o servidor Express.

📁 **hackafront** (Frontend React)

- 📁 **src**
  - `App.jsx` → Configuração de rotas do frontend.
  - `main.jsx` → Renderização principal do React.
  - `NewsList.jsx` → Exibição das notícias.
  - `AdminNews.jsx` → Interface de administração das notícias (CRUD).
  - 📁 **styles**
    - `NewsList.css` → Estilos personalizados para a página de notícias.
    - `AdminNews.css` → Estilos da página de administração.

---

## 🌟 Funcionalidades Detalhadas

### 📰 **Frontend** (Página principal)

- Exibição das notícias em cards.
- Expansão de conteúdo ao clicar (colapso).
- Uso de Bootstrap para um layout responsivo.

### 🔧 **Administração de Notícias** (`/admin`)

- Formulário para adicionar e editar notícias.
- Confirmação antes de excluir uma notícia.
- Listagem das notícias cadastradas no banco.
