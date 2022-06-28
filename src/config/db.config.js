const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  timezone: '+10:00',
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

var Card = require('../models/cards.model')(sequelize, Sequelize);
var User = require('../models/users.model')(sequelize, Sequelize);
db.shops = require('../models/shops.model')(sequelize, Sequelize);
db.systemRuns = require('./../models/systemRuns.model')(sequelize, Sequelize);
var Table = require('../models/tables.model')(sequelize, Sequelize);
var Protein = require('../models/proteins.model')(sequelize, Sequelize);
var Partner = require('../models/partners.model')(sequelize, Sequelize);
var Promotion = require('../models/promotions.model')(sequelize, Sequelize);
var Category = require('../models/categories.model')(sequelize, Sequelize);
var Product = require('../models/products.model')(sequelize, Sequelize);
var SetMenu = require('../models/setmenus.model')(sequelize, Sequelize);
var Printer = require('../models/printers.model')(sequelize, Sequelize);
Category.hasMany(Product);
Product.belongsTo(Category);
var CashDrawer = require('../models/cashdrawers.model')(sequelize, Sequelize);
var Order = require('../models/orders.model')(sequelize, Sequelize);
var OrderDetail = require('../models/orderDetails.model')(sequelize, Sequelize);
var OrderRequest = require('../models/orderRequest.model')(
  sequelize,
  Sequelize
);
var Customer = require('../models/customers.model')(sequelize, Sequelize);
var TableTransaction = require('../models/tableTransaction.model')(
  sequelize,
  Sequelize
);
db.user_role = require('../models/userRole.model')(sequelize, Sequelize);

var Role = require('../models/roles.model')(sequelize, Sequelize);

Order.hasMany(OrderDetail);
Order.hasMany(TableTransaction);
Partner.hasOne(Order);
Order.belongsTo(Partner, { constraints: false });
Product.hasMany(OrderDetail);
Protein.hasMany(OrderDetail);
OrderDetail.hasMany(SetMenu);
SetMenu.belongsTo(OrderDetail);
OrderDetail.belongsTo(Product);
OrderDetail.belongsTo(Protein, { constraints: false });
OrderDetail.belongsTo(Order);
OrderDetail.hasOne(OrderRequest);
OrderRequest.belongsTo(OrderDetail);
TableTransaction.belongsTo(Order);

Customer.hasOne(Order);
Promotion.hasOne(Order);
Order.belongsTo(Customer, { constraints: false });
Order.belongsTo(Promotion, { constraints: false });
Table.hasMany(TableTransaction);
TableTransaction.belongsTo(Table, { constraints: false });
User.hasMany(Order);
User.hasMany(Customer);
User.hasMany(Table);
User.hasMany(Category);
User.hasMany(Product);
User.hasMany(CashDrawer);
Order.belongsTo(User, { constraints: false });
Customer.belongsTo(User, { constraints: false });
Table.belongsTo(User, { constraints: false });
Category.belongsTo(User, { constraints: false });
Product.belongsTo(User, { constraints: false });
Product.hasMany(SetMenu);
SetMenu.belongsTo(Product);
Protein.hasMany(SetMenu);
SetMenu.belongsTo(Protein, { constraints: false });
CashDrawer.belongsTo(User, { constraints: false });
Printer.hasOne(Product);
Product.belongsTo(Printer, { constraints: false });

User.belongsToMany(Role, {
  through: 'user_role',
  as: 'roles',
  foreignKey: 'userId',
});

Role.belongsToMany(User, {
  through: 'user_role',
  as: 'users',
  foreignKey: 'roleId',
});

db.users = User;
db.roles = Role;
db.cashdrawers = CashDrawer;
db.orders = Order;
db.orderDetails = OrderDetail;
db.orderRequests = OrderRequest;
db.partners = Partner;
db.tables = Table;
db.tableTransactions = TableTransaction;
db.customers = Customer;
db.categories = Category;
db.products = Product;
db.setmenus = SetMenu;
db.proteins = Protein;
db.printers = Printer;
db.promotions = Promotion;
db.cards = Card;

Order.afterBulkUpdate(async ({ attributes, where }) => {
  if (attributes.orderStatus === 'ordered') {
    await OrderDetail.update(
      {
        makePrinted: true,
      },
      {
        where: {
          orderId: attributes.id,
        },
      }
    );
  }
});

module.exports = db;
