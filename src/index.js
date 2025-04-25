require('dotenv').config(); // Carrega variáveis de ambiente do .env
const express = require('express');
const app = express();

const database = require('./config/database');

// Controllers
const userController = require('./controllers/userController');
const projectController = require('./controllers/projectController');
const taskController = require('./controllers/taskController');

// Middlewares
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.json({ message: 'API rodando ' });
});

// Autenticação e registro
app.post('/login', userController.login);
app.post('/users/register', userController.criarUsuario); // Registro separado

// Usuários
//app.post('/users', userController.insert);
app.get('/users', userController.findAll);
app.put('/users/:idUsuario', userController.update);
app.delete('/users/:idUsuario', userController.remove);

// Projetos
app.post('/projects', projectController.insert);
app.get('/projects', projectController.findAll);
app.put('/projects/:idProjeto', projectController.update);
app.delete('/projects/:idProjeto', projectController.remove);

// Tarefas
app.post('/tasks', taskController.insert);
app.get('/tasks', taskController.findAll);
app.put('/tasks/:idTarefa', taskController.update);
app.delete('/tasks/:idTarefa', taskController.remove);


const PORT = process.env.PORT || 3000;

database.sync()
  .then(() => {
    console.log(' Banco sincronizado');
    app.listen(PORT, () => {
      console.log(` Servidor rodando em: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Erro ao sincronizar o banco:', err);
  });
