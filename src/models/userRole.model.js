module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define('user_role', {
        userId: {
            type: Sequelize.INTEGER,
        },
        roleId: {
            type: Sequelize.INTEGER,
        }
    }, {
        paranoid: false,
        updatedAt: true,
        createdAt: true
    }, {

    })


    return UserRole
}