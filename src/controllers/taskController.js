const Task = require('../models/task');
const User = require('../models/user');
const Project = require('../models/project');

module.exports = {
  // Criar nova tarefa
  async insert(req, res) {
    try {
      const { title, status, userId, projectId } = req.body;

      // Verifica campos obrigatórios
      if (!title || !userId || !projectId) {
        return res.status(400).json({ success: false, error: 'Campos obrigatórios: title, userId e projectId' });
      }

      // Valida usuário
      const usuario = await User.findByPk(userId);
      if (!usuario) return res.status(400).json({ success: false, error: 'Usuário não encontrado' });

      // Valida projeto
      const projeto = await Project.findByPk(projectId);
      if (!projeto) return res.status(400).json({ success: false, error: 'Projeto não encontrado' });

      // Valida status
      const statusPermitidos = ['pendente', 'em andamento', 'concluida'];
      if (status && !statusPermitidos.includes(status)) {
        return res.status(400).json({ success: false, error: 'Status inválido' });
      }

      const novaTarefa = await Task.create({ title, status, userId, projectId });

      res.status(201).json({
        success: true,
        message: 'Tarefa criada com sucesso',
        tarefa: novaTarefa
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Erro ao criar tarefa', message: err.message });
    }
  },

  // Listar todas as tarefas 
  async findAll(req, res) {
    try {
      const tarefas = await Task.findAll({
        include: [
          { model: User, as: 'usuario', attributes: ['id', 'nome', 'email'] },
          { model: Project, as: 'projeto', attributes: ['id', 'nome'] }
        ]
      });

      res.json({ success: true, tarefas });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Erro ao listar tarefas', message: err.message });
    }
  },

  // Atualizar tarefa
  async update(req, res) {
    try {
      const { idTarefa } = req.params;
      const dados = req.body;

      const tarefa = await Task.findByPk(idTarefa);
      if (!tarefa) return res.status(404).json({ success: false, error: 'Tarefa não encontrada' });

      // Valida status
      const statusPermitidos = ['pendente', 'em andamento', 'concluida'];
      if (dados.status && !statusPermitidos.includes(dados.status)) {
        return res.status(400).json({ success: false, error: 'Status inválido' });
      }

      // Valida userId
      if (dados.userId) {
        const usuario = await User.findByPk(dados.userId);
        if (!usuario) return res.status(400).json({ success: false, error: 'Usuário não encontrado' });
      }

      // Valida projectId
      if (dados.projectId) {
        const projeto = await Project.findByPk(dados.projectId);
        if (!projeto) return res.status(400).json({ success: false, error: 'Projeto não encontrado' });
      }

      await tarefa.update(dados);
      res.json({ success: true, message: 'Tarefa atualizada com sucesso', tarefa });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Erro ao atualizar tarefa', message: err.message });
    }
  },

  // Remover tarefa
  async remove(req, res) {
    try {
      const { idTarefa } = req.params;

      const tarefa = await Task.findByPk(idTarefa);
      if (!tarefa) return res.status(404).json({ success: false, error: 'Tarefa não encontrada' });

      await tarefa.destroy();
      res.json({ success: true, message: 'Tarefa removida com sucesso' });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Erro ao remover tarefa', message: err.message });
    }
  }
};
