
module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define('shops', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        tax_id: {
            type: Sequelize.STRING,
        },
        tel: { type: Sequelize.STRING },
        mobile: { type: Sequelize.STRING },
        address1: { type: Sequelize.STRING },
        address2: { type: Sequelize.STRING },
        state: { type: Sequelize.STRING },
        postcode: { type: Sequelize.STRING },
        country: { type: Sequelize.STRING },
        vat: { type: Sequelize.INTEGER },
        service_charge: { type: Sequelize.INTEGER}
    }, {
        paranoid: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true
    })
    return Shop
}