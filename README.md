🗂️ Projeto Avaliação - API REST com Sequelize + MySQL
Este projeto é uma API REST desenvolvida em Node.js com Sequelize, utilizando banco de dados MySQL via XAMPP. O sistema realiza operações CRUD com autenticação via JWT e proteção de senhas com bcrypt.

✅ Funcionalidades
CRUD completo para as entidades (User, Project, Task)

Registro e login de usuários com senha criptografada (bcrypt)

Autenticação com JWT

Banco de dados MySQL rodando via XAMPP

Logs armazenados em MongoDB (se aplicável)

⚙️ Requisitos
Node.js (v16+)

XAMPP com MySQL ativo

npm

MySQL (localhost)

MongoDB (opcional, para logs)

📦 Instalação
Clone o repositório

bash
Copiar
Editar
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
Instale as dependências

bash
Copiar
Editar
npm install
Configure o .env Crie um arquivo .env na raiz do projeto e adicione:

env
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=avaliacao
JWT_SECRET=sua_chave_secreta
⚠️ Altere JWT_SECRET para algo seguro em produção.

Inicie o XAMPP

Abra o painel do XAMPP

Inicie o Apache e o MySQL

Acesse http://localhost/phpmyadmin e crie o banco com nome avaliacao

Sincronize o banco (opcional)

Se o projeto já estiver com sequelize.sync() habilitado:

bash
Copiar
Editar
npm run dev
🚀 Rodando o Projeto
bash
Copiar
Editar
npm run dev
ou

bash
Copiar
Editar
node index.js
🧪 Endpoints disponíveis
POST /register → Cadastro de usuário

POST /login → Login do usuário

GET /projects → Lista de projetos (autenticado)

POST /projects → Criação de projeto

GET /tasks → Lista de tarefas

POST /tasks → Criação de tarefa

etc.

Use ferramentas como Postman ou Insomnia para testar os endpoints.


