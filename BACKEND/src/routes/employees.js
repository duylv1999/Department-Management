const express = require('express')
const router = express.Router()

const employeeController = require("../app/controllers/EmployeesController")

router.get('/', employeeController.index)
router.post('/', employeeController.create)
router.put('/:id', employeeController.update)
router.delete('/:id', employeeController.delete)


module.exports = router;