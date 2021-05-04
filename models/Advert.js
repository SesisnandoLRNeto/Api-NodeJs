const Sequelize = require('sequelize')
const sequelize = require('./db')
const db = require('./db')

const Advert = db.define('adverts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

// Advert.sync({ force: true }) - //cria um vez a tabela
Advert.sync()

module.exports = Advert