
module.exports = (sequelize, Sequelize) => {
    const Promotion = sequelize.define('promotions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        discount_percentage: {
            type: Sequelize.DOUBLE,
            defaultValue: 0
        },
        discount_price: {
            type: Sequelize.DECIMAL(20, 2),
            defaultValue: 0
        },
        promotionType: {
            type: Sequelize.ENUM,
            values: ["percentage", "price"],
            defaultValue: "percentage"
        }
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    
    return Promotion
}