module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "orders",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderNo: {
        type: Sequelize.STRING,
      },
      serviceCharge: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.00,
      },
      cardCharge: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.00,
      },
      personAmount: {
        type: Sequelize.INTEGER
      },
      tip: {
        type: Sequelize.DECIMAL(20, 2),
      },
      promotionAmount: {
        type: Sequelize.DECIMAL(20, 2),
      },
      customerId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      orderType: {
        type: Sequelize.ENUM,
        values: ["dine-in", "partner", "take-away", "delivery"],
        defaultValue: "dine-in",
      },
      paymentType: {
        type: Sequelize.ENUM,
        values: ["cash", "card", "take-away", "pay-id", "partner"],
      },
      pay: {
        type: Sequelize.DECIMAL(20, 2),
      },
      payReceive: {
        type: Sequelize.DECIMAL(20, 2),
      },
      payChange: {
        type: Sequelize.DECIMAL(20, 2),
      },
      actualPay: {
        type: Sequelize.VIRTUAL,
        get() {
          const total = this.pay +
            (this.serviceCharge / 100) *
            this.pay +
            (this.cardCharge / 100) *
            this.pay - this.promotionAmount

          return parseFloat(parseFloat(total).toFixed(2))
        },
        set(value) {
          throw new Error("Do not try to set the `total` value!")
        }
      },
      orderDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
      },
      orderStatus: {
        type: Sequelize.ENUM,
        values: ["new", "ordered", "served", "void", "closed"],
        defaultValue: "new",
      },
      remark: {
        type: Sequelize.STRING
      },
      diffRoundup: {
        type: Sequelize.DECIMAL(7,2)
      }
    },
    {
      paranoid: true,
      deletedAt: true,
      updatedAt: true,
      createdAt: true,
    }
  );
  return Order;
};
