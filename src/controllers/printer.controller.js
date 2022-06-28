const db = require("../config/db.config")
const { Op } = require('sequelize')
const Printer = db.printers

exports.save = (req, res) => {
    Printer.upsert(req.body, {
        returning: true
    }).then(function (result) {
        res.json(result)
    })
        .catch(err => {
            console.log(err.message);
            res.status(502).json({
                message: err.message
            })
        })
}

exports.findAll = (req, res) => {

    let query = null;
    if (req.query) {
        query = {
            name: {
                [Op.like]: `%${req.query.q}%`,
            },
        };
    }

    Printer.findAll({
        where: query
    })
        .then((printer) => {
            res.json(printer)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.findOne = (req, res) => {
    Printer.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((printer) => {
            res.json(printer)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.destroy = (req, res) => {
    Printer.destroy(
        {
            where: {
                id: req.params.id
            },
        }
    ).then((printer) => {
        if (printer) {
            res.json({
                message: "The printer has removed."
            })
        }

    }).catch(err => res.status(502).json({
        message: err.message
    }))
}