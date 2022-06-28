const express = require("express")
const router = express.Router()

const userController = require('./../controllers/user.controller')

router.get('/', userController.findAll)

router.post('/create', userController.create)

router.put('/update/:id', userController.update)

router.get('/roles', userController.findAllRole)

router.get('/:id', userController.findOne)

router.delete("/delete/:id", userController.destroy)

router.put('/reset-password/:id', userController.resetPassword)

module.exports = router