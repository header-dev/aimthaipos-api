const db = require("../config/db.config")
const Protein = db.proteins
const { Op } = require('sequelize')

exports.save = (req, res) => {

    Protein.upsert(req.body, {
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

    Protein.findAll({
        where: query
    })
        .then((protein) => {
            res.json(protein)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.findOne = (req, res) => {
    Protein.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((protein) => {
            res.json(protein)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.destroy = (req, res) => {
    Protein.destroy(
        {
            where: {
                id: req.params.id
            },
        }
    ).then((protein) => {
        if (protein) {
            res.json({
                message: "The protein has removed."
            })
        }

    }).catch(err => res.status(502).json({
        message: err.message
    }))
}