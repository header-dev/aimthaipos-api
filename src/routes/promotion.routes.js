const express = require("express")
const router = express.Router()

const promotionController = require('./../controllers/promotion.controller')


router.post('/save', promotionController.save)

router.get('/', promotionController.findAll)

router.get('/:id', promotionController.findOne)

router.delete("/delete/:id", promotionController.destroy)


module.exports = router