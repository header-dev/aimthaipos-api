const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const SetMenu = sequelize.define(
    'setmenus',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      paranoid: true,
      deletedAt: true,
      updatedAt: true,
      createdAt: true,
    }
  );
  return SetMenu;
};
