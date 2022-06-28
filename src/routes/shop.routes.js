const express = require("express")
const router = express.Router()

const shopController = require('./../controllers/shop.controller')

router.post('/create', shopController.create)
router.get('/', shopController.findOne)

module.exports = router