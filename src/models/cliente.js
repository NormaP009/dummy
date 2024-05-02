const dbConnection = require('../database/connection');
const { DataTypes } = require('sequelize');

const Cliente = dbConnection.define('Clientes', {
  nombre: {
    type: DataTypes.STRING,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    unique: true,
  },
  numero_de_telefono: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  creado_en: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  hooks: {
    //se ejecuta antes de atualizar un registro
    beforeUpdate: (cliente) => {
      cliente.creado_en = new Date();
    },
  },
});

module.exports = Cliente;