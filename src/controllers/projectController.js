const Project = require('../models/project');

class ProjectController {
  // Criar novo projeto
  static async insert(req, res) {
    try {
      const { name, description } = req.body;
      const novoProjeto = await Project.create({ name, description });

      res.status(201).json({
        message: 'Projeto criado com sucesso',
        projeto: novoProjeto
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar projeto', error: error.message });
    }
  }

  // Buscar todos os projetos
  static async findAll(req, res) {
    try {
      const projetos = await Project.findAll();
      res.status(200).json(projetos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar projetos', error: error.message });
    }
  }

  // Atualizar projeto
  static async update(req, res) {
    try {
      const { idProjeto } = req.params;
      const { name, description } = req.body;

      const projeto = await Project.findByPk(idProjeto);
      if (!projeto) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }

      await projeto.update({ name, description });

      res.status(200).json({
        message: 'Projeto atualizado com sucesso',
        projeto
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar projeto', error: error.message });
    }
  }

  // Remover projeto
  static async remove(req, res) {
    try {
      const { idProjeto } = req.params;

      const projeto = await Project.findByPk(idProjeto);
      if (!projeto) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }

      await projeto.destroy();

      res.status(200).json({ message: 'Projeto deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar projeto', error: error.message });
    }
  }
}

module.exports = ProjectController;
