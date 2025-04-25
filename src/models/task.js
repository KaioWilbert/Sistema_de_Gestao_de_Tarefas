const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./user');
const Project = require('./project');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em andamento', 'concluida'),
    defaultValue: 'pendente'
  }
}, {
  timestamps: true
});

// Relacionamentos
Task.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });
User.hasMany(Task, { foreignKey: 'userId', as: 'tarefas' });

Task.belongsTo(Project, { foreignKey: 'projectId', as: 'projeto' });
Project.hasMany(Task, { foreignKey: 'projectId', as: 'tarefas' });

module.exports = Task;
