const express = require('express')
const router = express.Router()

const userController = require("../app/controllers/userController")

router.post('/registry', userController.registry)
router.post('/login', userController.login)


module.exports = router;