module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define(
    "customers",
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
      tel: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      postalcode: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      deletedAt: true,
      updatedAt: true,
      createdAt: true,
    }
  );
  return Customer;
};
