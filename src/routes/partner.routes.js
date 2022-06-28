const express = require("express")
const router = express.Router()

const partnerController = require('./../controllers/partner.controller')


router.post('/save', partnerController.save)

router.get('/', partnerController.findAll)

router.get('/:id', partnerController.findOne)

router.delete("/delete/:id", partnerController.destroy)


module.exports = router