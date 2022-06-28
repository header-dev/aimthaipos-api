module.exports = (sequelize, Sequelize) => {
    const CashDrawer = sequelize.define('cashDrawers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cash: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        openDate: {
            type: Sequelize.DATEONLY,
            defaultValue : Sequelize.fn('CURRENT_TIMESTAMP')
        },
        status: {
            type: Sequelize.ENUM,
            values: ['open', 'closed'],
            defaultValue: 'open'
        },
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    return CashDrawer
}