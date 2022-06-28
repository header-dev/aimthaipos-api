const express = require("express")
const router = express.Router()

const categoriesController = require('./../controllers/categories.controller')


router.post('/save', categoriesController.save)

router.get('/', categoriesController.findAll)

router.get('/:id', categoriesController.findOne)

router.delete("/delete/:id", categoriesController.destroy)


module.exports = router