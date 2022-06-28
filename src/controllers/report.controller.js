const { Op, QueryTypes } = require("sequelize");
const db = require("../config/db.config");
const moment = require("moment");
const Table = db.tables;
const Order = db.orders;
const OrderDetail = db.orderDetails;
const TableTransaction = db.tableTransactions;
const Product = db.products
const Category = db.categories
const Protein = db.proteins
const Partner = db.partners

const _ = require("lodash");

const { sequelize } = require("../config/db.config");

exports.findAllDailyIncome = (req, res) => {

    sequelize.query(`SELECT * 
    FROM (SELECT
        DAYNAME(CAST(a.orderDate as DATE)) as Day,
        MONTHNAME(CAST(a.orderDate as DATE)) as Month, 
        DAY(CAST(a.orderDate as DATE)) as 'Date',
        WEEKOFYEAR(CAST(a.orderDate as DATE)) as 'Week',
        CAST(a.orderDate as DATE) AS FullDate,
        SUM(e.pay - IFNULL(e.promotionAmount, 0)) AS Partner,
        SUM(c.pay - IFNULL(c.promotionAmount, 0)) AS PayID,
        SUM(b.pay - IFNULL(b.promotionAmount, 0)) AS Cash,
        SUM(d.pay - IFNULL(d.promotionAmount, 0)) AS Card,
        SUM(ad.pay - IFNULL(ad.promotionAmount, 0)) as CardReduction
    FROM
        orders a
    LEFT JOIN (SELECT * from orders WHERE paymentType = 'cash') b ON
        a.id = b.id
    LEFT JOIN (SELECT * from orders WHERE paymentType = 'pay-id') c ON
        a.id = c.id
    LEFT JOIN (SELECT id, (pay+((cardCharge/100) * pay)) as pay,promotionAmount from orders WHERE paymentType = 'card') d ON
        a.id = d.id
    LEFT JOIN (SELECT id, ((pay+((cardCharge/100) * pay))-(1.9/100*(pay+((cardCharge/100) * pay)))) as pay ,promotionAmount
    		from orders WHERE paymentType = 'card') ad ON
        a.id = ad.id
    LEFT JOIN (SELECT * from orders WHERE paymentType = 'partner') e ON
        a.id = e.id
    WHERE a.deletedAt IS NULL AND a.orderStatus IN ('closed')
    GROUP BY CAST(a.orderDate as DATE)) as T1
    WHERE T1.FullDate BETWEEN :DateFrom and :DateTo`, {
        replacements: {
            DateFrom: moment(req.query.df).format("YYYY-MM-DD"),
            DateTo: moment(req.query.dt).format("YYYY-MM-DD"),
        },
        type: QueryTypes.SELECT
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(502).json({
                message: err.message,
            });
        });

}

exports.findAllDailySale = (req, res) => {
    let query = null;
    if (req.query.q) {
        query = {
            orderDate: {
                [Op.gt]: moment(req.query.q).format("YYYY-MM-DD 00:00"),
                [Op.lt]: moment(req.query.q).format("YYYY-MM-DD 23:59"),
            },
            orderStatus: "closed"
        };
    } else {
        query = {
            orderDate: {
                [Op.gt]: moment().format("YYYY-MM-DD 00:00"),
                [Op.lt]: moment().format("YYYY-MM-DD 23:59"),
            },
            orderStatus: "closed"
        }
    }
    
    Order.findAll({
        where: query,
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
                include:[
                    {
                        model: Product,
                        include:[
                            {
                                model: Category
                            }
                        ]
                    }    
                ]
            },
            {
                model: Partner,
                required: false,
            }
        ],
        order: [["orderNo", "desc"]],
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(502).json({
                message: err.message,
            });
        });

}

exports.findAllSummarySaleTransactionItem = (req, res) => {

    let query = null;
    if (req.query.q) {
        query = {
            orderDate: {
                [Op.gt]: moment(req.query.q).format("YYYY-MM-DD 00:00"),
                [Op.lt]: moment(req.query.q).format("YYYY-MM-DD 23:59"),
            },
            orderStatus: "closed"
        };
    } else {
        query = {
            orderDate: {
                [Op.gt]: moment().format("YYYY-MM-DD 00:00"),
                [Op.lt]: moment().format("YYYY-MM-DD 23:59"),
            },
            orderStatus: "closed"
        }
    }

    OrderDetail.findAll({
        attributes: [[db.Sequelize.fn('sum', db.Sequelize.col('quantity')), 'total']],
        include: [
            {
                model: Product,
            },
            {
                model: Order,
                where: query
            },
            {
                model: Protein,
                required: true
            }
        ],
        group: ['protein.name', 'product.name'],
    }).then(result => {
        res.json(result)
    })
        .catch((err) => {
            res.status(502).json({
                message: err.message,
            });
        });

}

exports.findAllSummarySaleItem = (req, res) => {

    let query = null;
    if (req.query) {
        query = {
            orderDate: {
                [Op.gt]: moment(req.query.date_f).format("YYYY-MM-DD 00:00"),
                [Op.lt]: moment(req.query.date_e).format("YYYY-MM-DD 23:59"),
            },
            orderStatus: "closed"
        };
    } else {
        query = {
            orderDate: {
                [Op.gt]: moment().format("YYYY-MM-DD 00:00"),
                [Op.lt]: moment().format("YYYY-MM-DD 23:59"),
            },
            orderStatus: "closed"
        }
    }

    OrderDetail.findAll({
        attributes: [
            [db.Sequelize.fn('sum', db.Sequelize.col('quantity')), 'total']
        ],
        include: [
            {
                model: Product,
            },
            {
                model: Order,
                where: query,
                required: true
            },
        ],
        group: ['productId','product.name'],
    }).then(result => {
        res.json(result)
    })
        .catch((err) => {
            res.status(502).json({
                message: err.message,
            });
        });

}