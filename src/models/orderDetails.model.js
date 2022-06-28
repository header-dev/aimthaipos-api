module.exports = (sequelize, Sequelize) => {
  const OrderDetail = sequelize.define(
    'orderDetails',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      addition_price: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      priceAdditionPrice: {
        type: Sequelize.VIRTUAL,
        get() {
          return this.price + this.addition_price;
        },
        set(value) {
          throw new Error('Do not try to set the `amount` value!');
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.VIRTUAL,
        get() {
          let decimalValue = 0.0;
          /**if (this.makeTakeAway) {
                    decimalValue = this.priceAdditionPrice - Math.floor(this.priceAdditionPrice)
                }**/
          return (
            (this.priceAdditionPrice -
              parseFloat(decimalValue).toFixed(2) +
              this.partnerPrice) *
            this.quantity
          );
        },
        set(value) {
          throw new Error('Do not try to set the `amount` value!');
        },
      },
      discount: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      partnerPrice: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      totalAmount: {
        type: Sequelize.VIRTUAL,
        get() {
          return this.amount - this.discount;
        },
        set(value) {
          throw new Error('Do not try to set the `total` value!');
        },
      },
      makeTakeAway: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      makePrinted: {
        type: Sequelize.BOOLEAN,
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

  return OrderDetail;
};
