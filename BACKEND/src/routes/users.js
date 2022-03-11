const express = require('express')
const router = express.Router()

const userController = require("../app/controllers/UserController")

router.post('/', userController.login)


module.exports = router;