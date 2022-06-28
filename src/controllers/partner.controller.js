const db = require("../config/db.config")
const Partner = db.partners
const { Op } = require('sequelize')

const multer = require('multer')

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'public/images/partners/')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
})


exports.save = (req, res) => {

    let upload = multer({ storage: Storage }).single('logo');
    upload(req, res, function (err) {
        if (!req.file) {
            res.status(502).json({
                message: 'Please select an image to upload'
            })
        } else if (err instanceof multer.MulterError) {
            res.status(502).json({
                message: err.message
            })
        } else if (err) {
            res.status(502).json({
                message: err.message
            })
        }

        var data = {
            id: req.body.id,
            name: req.body.name,
            chargePrice: req.body.chargePrice,
             percentage: req.body.percentage,
            logo: req.file.filename
        }

        Partner.upsert(data, {
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
    });


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

    Partner.findAll({
        where: query
    })
        .then((partner) => {
            res.json(partner)
        })
        .catch(err => res.status(400).send(err))
}

exports.findOne = (req, res) => {
    Partner.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((partner) => {
            res.json(partner)
        })
        .catch(err => res.status(502).json({
            message: err.message
        }))
}

exports.destroy = (req, res) => {
    Partner.destroy(
        {
            where: {
                id: req.params.id
            },
        }
    ).then((partner) => {
        if (partner) {
            res.json({
                message: "The partner has removed."
            })
        }

    }).catch(err => {
        console.log(err);
        res.status(502).send(err)
    })
}