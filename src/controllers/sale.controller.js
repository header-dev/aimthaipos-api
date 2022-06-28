const { Op } = require('sequelize');
const db = require('../config/db.config');
const moment = require('moment');
const { partners } = require('../config/db.config');
const CashDrawer = db.cashdrawers;
const Table = db.tables;
const SystemRun = db.systemRuns;
const Order = db.orders;
const OrderDetail = db.orderDetails;
const OrderRequest = db.orderRequests;
const TableTransaction = db.tableTransactions;
const Product = db.products;
const Customer = db.customers;
const Partner = db.partners;
const Category = db.categories;
const Promotion = db.promotions;
const SetMenu = db.setmenus;

const _ = require('lodash');

const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

const generateOrderNumber = () => {
  return new Promise((resolve, reject) => {
    SystemRun.findOne({
      where: {
        code: 'NEW_ORDER',
        month: moment().format('MM'),
        year: moment().format('YY'),
        day: moment().format('DD'),
      },
    })
      .then((systemRunResult) => {
        if (systemRunResult) {
          let getNum = Number(systemRunResult.num) + 1;
          systemRunResult
            .update({
              num: getNum,
            })
            .then(() => {
              let resultGenerateNew = `${moment().format(
                'YY'
              )}${moment().format('MM')}${moment().format('DD')}${getNum
                .toString()
                .substr(systemRunResult.pos1, systemRunResult.pos2)}`;

              resolve(resultGenerateNew);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          SystemRun.create({
            num: 1000001,
            pos1: 3,
            pos2: 7,
            name: 'New Order',
            code: 'NEW_ORDER',
            day: moment().format('DD'),
            month: moment().format('MM'),
            year: moment().format('YY'),
          })
            .then((resultCreate) => {
              const { day, month, year, pos1, pos2, num } = resultCreate.get({
                plain: true,
              });
              let resultGenerateNew = `${year}${month}${day}${num
                .toString()
                .substr(pos1, pos2)}`;
              resolve(resultGenerateNew);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.checkInitialCash = (req, res) => {
  CashDrawer.findOne({
    where: {
      openDate: moment().format('YYYY-MM-DD'),
    },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.initialCash = (req, res) => {
  CashDrawer.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.findAllMenu = (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.findAllOrder = (req, res) => {
  let query = null;
  if (req.params.userid) {
    query = {
      userId: req.params.userid,
    };
  }

  Order.findAll({
    where: {
      ...query,
      orderDate: {
        [Op.gt]: moment().format('YYYY-MM-DD 00:00'),
        [Op.lt]: moment().format('YYYY-MM-DD 23:59'),
      },
    },
    include: [
      {
        model: TableTransaction,
        include: [
          {
            model: Table,
          },
        ],
        required: false,
      },
      {
        model: Partner,
        required: false,
      },
    ],
    order: [['orderNo', 'desc']],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.findOneOrder = (req, res) => {
  Order.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: TableTransaction,
        include: [
          {
            model: Table,
          },
        ],
        required: false,
      },
      {
        model: OrderDetail,
        include: [
          {
            model: Product,
            include: [
              {
                model: db.printers,
              },
              {
                model: db.categories,
              },
            ],
          },
          {
            model: OrderRequest,
          },
          {
            model: db.proteins,
          },
          {
            model: db.setmenus,
            include: [
              {
                model: db.products,
              },
              {
                model: db.proteins,
              },
            ],
          },
        ],
        required: false,
      },
      {
        model: Customer,
        required: false,
      },
      {
        model: Partner,
        required: false,
      },
      {
        model: Promotion,
        required: false,
      },
    ],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.createOrUpdateOrder = async (req, res) => {
  let data = req.body;
  data.orderNo = await generateOrderNumber();

  Order.upsert(data, {
    include: [
      {
        model: TableTransaction,
        as: 'tableTransactions',
      },
    ],
    plain: true,
  })
    .then(() => {
      return Order.findOne({
        where: {
          orderNo: data.orderNo,
        },
      });
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.updateOrder = async (req, res) => {
  const id = req.params.id;
  Order.update(
    { ...req.body, id: id },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  )
    .then((result) => {
      if (
        req.body.orderStatus === 'closed' ||
        req.body.orderStatus === 'void'
      ) {
        TableTransaction.update(
          {
            status: 'un-active',
          },
          {
            where: {
              orderId: id,
            },
          }
        );
      }
      res.json(result);
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.addTableOrder = (req, res) => {
  TableTransaction.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.createOrderDetail = (req, res) => {
  console.log(req.body);
  OrderDetail.create(req.body, {
    include: [
      {
        model: OrderRequest,
      },
      {
        model: SetMenu,
      },
    ],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.updateOrderDetail = (req, res) => {
  const id = req.params.id;
  OrderDetail.update(req.body, {
    where: {
      id: id,
    },
    returning: true,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.destroyOrderDetail = (req, res) => {
  OrderDetail.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.createDiscount = (req, res) => {
  OrderDetail.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.findAllTable = (req, res) => {
  let query = null;
  if (req.query.q) {
    query = {
      table_name: {
        [Op.like]: `%${req.query.q}%`,
      },
    };
  }

  Table.findAll({
    where: query,
  })
    .then((table) => {
      return table;
    })
    .then((result) => {
      return Promise.all([
        result,
        TableTransaction.findAll({
          where: {
            createdAt: {
              [Op.gt]: moment().format('YYYY-MM-DD 00:00'),
              [Op.lt]: moment().format('YYYY-MM-DD 23:59'),
            },
            status: 'active',
          },
        }),
      ]);
    })
    .then((result) => {
      let tableResult = Object.assign([], result[0]);
      tableResult.map((t) => {
        let tableTrans = _.find(result[1], { tableId: t.id });
        if (tableTrans) {
          return (t.status = 'unavailable');
        }
      });
      res.json(tableResult);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.findAllCustomer = (req, res) => {
  let query = null;
  if (req.query.q) {
    query = {
      name: {
        [Op.like]: `%${req.query.q}%`,
      },
    };
  }
  Customer.findAll({
    where: query,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.createCustomer = (req, res) => {
  Customer.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.mergeTable = (req, res) => {
  const id = req.params.id;
  res.json({});
};
