
module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define('tables', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        table_no: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        table_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        merge_name: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM,
            values: ['avaliable', 'unavailable', 'merge'],
            defaultValue: 'avaliable'
        },
        person_support: {
            type: Sequelize.INTEGER,
        },
        remark: {
            type: Sequelize.STRING,
        },
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    
    return Table
}