const { Sequelize, Model } = require('sequelize');

const dbConnection = new Sequelize('usuario', 'root', 'mypass', {
  host:'127.0.0.1',
  dialect: 'mariadb',
});

module.exports = dbConnection;