
module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define('cards', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fee: {
            type: Sequelize.DOUBLE,
        },
        providerFee: {
            type: Sequelize.DOUBLE,
        }
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    return Card
}