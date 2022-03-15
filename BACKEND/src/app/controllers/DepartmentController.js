const pool = require("../../model/db")
import {StatusCodes} from 'http-status-codes'

class departmentController {

    // [GET] /departments
    async index(req, res) {
        try {
            const allEmployees = await pool.query(
                "SELECT * FROM departments"
            );
            
            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Get departments successfully....."
            })
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Get departments failed....."
            })
        }
    }

    // [DELETE] /departments
    async delete(req, res) {
        try {
            const { id } = req.params
            console.log(id)
            const deleteDepartment = await pool.query('DELETE FROM departments WHERE department_id =$1', [id])

            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Deleted departments successfully....."
            })
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Delete departments failed....."
            })
        }
    }


    // [Update] /departments
    async update(req, res) {
        try {
            const { id } = req.params;
            const { department } = req.body;

            const updateDepartment = await pool.query("UPDATE departments SET department= $1 WHERE department_id = $2",
                [department, id])

            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Update departments successfully....."
            })
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Update departments failed....."
            })
        }
    }

    // [CREATE] /departments
    async create(req, res) {
        try {
            const { department } = req.body

            const newDepartment = await pool.query("INSERT INTO departments (department) VALUES ($1) RETURNING *", [department])

            res.status(StatusCodes.OK).json({
                success: "true",
                msg: "Create departments successfully....."
            })
            // console.log("Create a Department succesfully.....")
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Create departments failed....."
            })
        }
    }
}

module.exports = new departmentController