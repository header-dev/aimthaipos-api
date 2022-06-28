module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "categories",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataLevel: {
        type: Sequelize.INTEGER
      },
    },
    {
      paranoid: true,
      deletedAt: true,
      updatedAt: true,
      createdAt: true,
    }
  );

  return Category;
};
