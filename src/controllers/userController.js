const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

const userController = {
  async criarUsuario(req, res) {
    try {
      const { name, email, password } = req.body;
      const existente = await User.findOne({ where: { email } });
      if (existente) return res.status(400).json({ error: 'Email já cadastrado' });

      const hash = await bcrypt.hash(password, 10);
      const novoUsuario = await User.create({ name, email, password: hash });

      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        usuario: {
          id: novoUsuario.id,
          name: novoUsuario.name,
          email: novoUsuario.email
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao registrar usuário', message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const usuario = await User.findOne({ where: { email } });
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

      const passwordValida = await bcrypt.compare(password, usuario.password);
      if (!passwordValida) return res.status(401).json({ error: 'password inválida' });

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1d' });

      res.json({
        message: 'Login realizado com sucesso',
        token,
        usuario: {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao fazer login', message: err.message });
    }
  },

  async insert(req, res) {
    res.status(501).json({ error: 'Função insert ainda não implementada' });
  },

  async findAll(req, res) {
    try {
      const usuarios = await User.findAll({
        attributes: ['id', 'name', 'email'] 
      });
      res.json(usuarios);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  async update(req, res) {
    try {
      const { idUsuario } = req.params;
      const { name, email, password } = req.body;

      const usuario = await User.findByPk(idUsuario);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if (name) usuario.name = name;
      if (email) usuario.email = email;
      if (password) usuario.password = await bcrypt.hash(password, 10);

      await usuario.save();

      res.json({
        message: 'Usuário atualizado com sucesso',
        usuario: {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar usuário', message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const { idUsuario } = req.params;
  
      const usuario = await User.findByPk(idUsuario);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      await usuario.destroy();
  
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (err) {
      console.error('Erro ao remover usuário:', err);
      res.status(500).json({ error: 'Erro ao remover usuário', message: err.message });
    }
  },  
};

module.exports = userController;
