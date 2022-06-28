const express = require("express")
const router = express.Router()

const printerController = require('./../controllers/printer.controller')


router.post('/save', printerController.save)

router.get('/', printerController.findAll)

router.get('/:id', printerController.findOne)

router.delete("/delete/:id", printerController.destroy)


module.exports = router