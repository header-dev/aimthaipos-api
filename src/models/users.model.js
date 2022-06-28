const bcrypt = require("bcryptjs")
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: { type: Sequelize.STRING,allowNull: false, },
        firstname: { type: Sequelize.STRING,allowNull: false, },
        lastname: { type: Sequelize.STRING,allowNull: false, },
        fullname: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${this.firstname} ${this.lastname}`
            },
            set(value) {
                throw new Error("Do not try to set the `fullname` value!")
            }
        },
        email: { 
            type: Sequelize.STRING, 
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('password', bcrypt.hashSync(value, 8));
            }
        }
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    }, {

    })


    return User
}