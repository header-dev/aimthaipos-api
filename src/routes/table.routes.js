const express = require("express")
const router = express.Router()

const tableController = require('./../controllers/table.controller')

router.post('/create', tableController.create)

router.get('/', tableController.findAll)

router.put('/update/:id', tableController.update)

router.delete("/delete/:id", tableController.destroy)


module.exports = router