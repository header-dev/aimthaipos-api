const db = require("../config/db.config")
const Promotion = db.promotions
const { Op } = require("sequelize")

exports.save = (req, res) => {

    Promotion.upsert(req.body, {
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
    console.log(req.query);

    Promotion.findAll({
        where: query
    })
        .then((promotion) => {
            console.log(promotion);
            res.json(promotion)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.findOne = (req, res) => {
    Promotion.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((promotion) => {
            res.json(promotion)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.destroy = (req, res) => {
    Promotion.destroy(
        {
            where: {
                id: req.params.id
            },
        }
    ).then((promotion) => {
        if (promotion) {
            res.json({
                message: "The promotion has removed."
            })
        }

    }).catch(err => res.status(502).json({
        message: err.message
    }))
}