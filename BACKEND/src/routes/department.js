
const express = require('express')
const router = express.Router()

const departmentController = require("../app/controllers/departmentController")

router.get("/", departmentController.index)
router.post("/", departmentController.create)
router.delete("/:id", departmentController.delete)
router.put("/:id", departmentController.update)



module.exports = router;