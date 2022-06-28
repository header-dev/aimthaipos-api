
module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define('partners', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        chargePrice: {
            type: Sequelize.DECIMAL(20, 2),
        },
        percentage: {
            type: Sequelize.DOUBLE,
        },
        logo: {
            type: Sequelize.STRING
        }
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    return Partner
}