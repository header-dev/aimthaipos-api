
const { result } = require("lodash")
const db = require("../config/db.config")
const Card = db.cards


exports.create = (req, res) => {
    Card.upsert(req.body, {
        returning: true
    }).then(function (result) {
        res.json({
            message: result
        })
    })
        .catch(err => {
            res.status(502).json({
                message: err.message
            })
        })
}

exports.findOne = (req, res) => {
    Card.findOne()
        .then((shop) => {
            res.json(shop)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}