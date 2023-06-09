const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  username: 'admin',
  password: 'admin',
  port:3000,
  location: ' Av.Livertador 1460',
  telefono : '3514563344',
});

module.exports = sequelize;
