module.exports = (sequelize, Sequelize) => {
    const OrderRequest = sequelize.define(
      "orderRequests",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        no_garlic:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        no_peanut:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        no_onion:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        no_beanshot:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        no_chilli:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        no_mind:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        no_spicy:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        remark:{
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
  
    return OrderRequest;
  };
  