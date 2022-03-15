const pool = require("../../../db")
import {StatusCodes} from 'http-status-codes'

class employeeController {

    // [GET] /employees
    async index(req, res) {
        try {
            const allEmployees = await pool.query(
                "SELECT employee_id, firstname, lastname, email, departments.department, departments.department_id FROM employees JOIN departments ON employees.department_id = departments.department_id"
            );

            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Get employees successfully....."
            })
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Get employees failed....."
            })
        }
    }

    // [POST] /employees
    async create(req, res) {
        try {
            const { firstname, lastname, email, department_id } = req.body

            const newEmployee = await pool.query(
                "INSERT INTO employees ( firstname, lastname, email, department_id) VALUES($1, $2, $3, $4) RETURNING *",
                [firstname, lastname, email, department_id]
            )

            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Create employees successfully....."
            })
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Create employees failed....."
            })
        }
    }

    // [UPDATE] /employees
    async update(req, res) {
        try {
            const { id } = req.params;
            const { firstname, lastname, email, department_id } = req.body;

            const updateEmployee = await pool.query("UPDATE employees SET  firstname = $1, lastname = $2, email = $3, department_id= $4 WHERE employee_id = $5",
                [firstname, lastname, email, department_id, id])

            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Update employees successfully....."
            })
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Update employees failed....."
            })
        }
    }

    // [DELETE] employee
    async delete(req, res) {
        try {
            const { id } = req.params;

            const deleteEmployee = await pool.query("DELETE FROM employees WHERE employee_id =$1", [id])

            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Deleted employees successfully....."
            })
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Delete employees failed....."
            })
        }
    }
}


module.exports = new employeeController;