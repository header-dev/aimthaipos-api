const express = require("express")
const router = express.Router()

const proteinController = require('./../controllers/protein.controller')


router.post('/save', proteinController.save)

router.get('/', proteinController.findAll)

router.get('/:id', proteinController.findOne)

router.delete("/delete/:id", proteinController.destroy)


module.exports = router