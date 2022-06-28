
module.exports = (sequelize, Sequelize) => {
    const Protein = sequelize.define('proteins', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        addition_price: {
            type: Sequelize.DECIMAL(20, 2),
            defaultValue: 0,
        }
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    return Protein
}