🏗️ Sistema de Gerenciamento de Projetos e Tarefas
Este projeto é uma API RESTful construída com Node.js, Express e Sequelize, conectada ao MySQL via XAMPP. Ela permite a criação, listagem, atualização e exclusão de usuários, projetos e tarefas. Também implementa autenticação com JWT.

✅ Funcionalidades
Cadastro e login de usuários com senha criptografada (bcrypt)

Autenticação com JWT

CRUD de Projetos

CRUD de Tarefas (relacionadas a projetos e usuários)

Relacionamentos entre tabelas

Conexão com MongoDB para logs (se desejar expandir)

Organização por controladores e modelos

🧰 Tecnologias utilizadas
Node.js

Express

Sequelize

MySQL (via XAMPP)

JWT

Bcrypt

Dotenv

🚀 Como rodar o projeto localmente
1. Clone o repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
2. Instale as dependências
bash
Copiar
Editar
npm install
3. Configure o arquivo .env
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=avaliacao
JWT_SECRET=sua_chave_secreta
4. Crie o banco de dados
Abra o XAMPP, inicie o MySQL, e acesse o phpMyAdmin.

Crie um banco com o nome avaliacao

As tabelas serão criadas automaticamente quando a aplicação for executada.

5. Inicie a API
bash
Copiar
Editar
npm run dev
# ou
node index.js
🧪 Dados iniciais (se necessário)
Você pode popular dados de teste via ferramentas como Insomnia ou Postman, utilizando as rotas:

POST /auth/register

POST /auth/login

POST /projetos

POST /tarefas

📁 Estrutura de Pastas
bash
Copiar
Editar
.
├── controllers/
├── models/
├── routes/
├── .env
├── index.js
├── README.md
