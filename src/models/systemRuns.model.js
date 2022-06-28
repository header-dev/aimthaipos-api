module.exports = (sequelize, Sequelize) => {
  const SystemRun = sequelize.define(
    "systemRuns",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      num: {
        type: Sequelize.STRING,
      },
      pos1: {
        type: Sequelize.INTEGER,
      },
      pos2: {
        type: Sequelize.INTEGER,
      },
      day: {
        type: Sequelize.STRING,
      },
      month: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      deletedAt: true,
      updatedAt: true,
      createdAt: true,
    }
  );
  return SystemRun;
};
