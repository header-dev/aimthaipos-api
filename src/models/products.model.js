const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    'products',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['protein', 'vegetarian', 'drink', 'general', 'set'],
        defaultValue: 'general',
      },
      photo: {
        type: DataTypes.STRING,
      },
      cost: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      price: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      specialPrice: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      favorite: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      subSetMenu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
      deletedAt: true,
      updatedAt: true,
      createdAt: true,
    }
  );
  return Product;
};
