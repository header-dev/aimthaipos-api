const express = require("express")
const router = express.Router()

const cardController = require('./../controllers/card.controller')

router.post('/create', cardController.create)
router.get('/', cardController.findOne)

module.exports = router