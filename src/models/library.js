const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');

const Library = sequelize.define('Library', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Library.hasMany(Book, { foreignKey: 'libraryId' });
Book.belongsTo(Library, { foreignKey: 'libraryId' });

module.exports = Library;
