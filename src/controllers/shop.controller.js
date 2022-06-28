
const { result } = require("lodash")
const db = require("../config/db.config")
const Shop = db.shops


exports.create = (req, res) => {
    Shop.upsert(req.body, {
        returning: true
    }).then(function (result) {
        res.json({
            message: result
        })
    })
        .catch(err => {
            console.log(err.message);
            res.status(502).json({
                message: err.message
            })
        })
}

exports.findOne = (req, res) => {
    Shop.findOne()
        .then((shop) => {
            res.json(shop)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}