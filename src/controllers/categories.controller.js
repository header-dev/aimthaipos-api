const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require("../config/db.config")
const Category = db.categories


exports.save = (req, res) => {

    Category.upsert(req.body, {
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

    Category.findAll({
        where: query,
        include: [{
            model: db.products,
        }]
    })
        .then((category) => {
            res.json(category)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.findOne = (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((category) => {
            res.json(category)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.destroy = (req, res) => {
    Category.destroy(
        {
            where: {
                id: req.params.id
            },
        }
    ).then((category) => {
        if (category) {
            res.json({
                message: "The category has removed."
            })
        }

    }).catch(err => res.status(502).json({
        message: err.message
    }))
}

exports.findAllSale = (req, res) => {

    var query = {}

    if (req.params.fav == 1) {
        query = {
            ...query,
            favorite: req.params.fav
        }
        
    }

    if (req.params.name !== 'ALL') {
        query = {
            ...query,
            name: {
                [Op.like]: `%${req.params.name}%`
            },
        }
    }

    var categoryQuery = {}
    if (req.params.category !== 'ALL') {
        categoryQuery = {
            name: {
                [Op.like]: `%${req.params.category}%`
            },
        }
    }

    Category.findAll({
        where: categoryQuery,
        include: [{
            model: db.products,
            where: query,
            required: false
        }]
    })
        .then((category) => {
            res.json(category)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}