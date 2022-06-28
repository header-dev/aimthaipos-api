
module.exports = (sequelize, Sequelize) => {
    const Printer = sequelize.define('printers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ipAddress: {
            type: Sequelize.STRING,
        },
        port: {
            type: Sequelize.INTEGER
        }
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    return Printer
}