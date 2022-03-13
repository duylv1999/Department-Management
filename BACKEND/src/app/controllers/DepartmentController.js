const pool = require("../../../db")

class EmployeeController {

    // [GET] /departments
    async index(req, res) {
        try {
            const allEmployees = await pool.query(
                "SELECT * FROM departments"
            );

            res.json(allEmployees.rows)
        } catch (err) {
            console.error(err.message);
        }
    }

    // [DELETE] /departments
    async delete(req, res) {
        try {
            const { id } = req.params
            console.log(id)
            const deleteDepartment = await pool.query('DELETE FROM departments WHERE department_id =$1', [id])

            res.json("Department was deleted!.....")
        } catch (err) {
            console.error(err.message);
        }
    }


    // [Update] /departments
    async update(req, res) {
        try {
            const { id } = req.params;
            const { department } = req.body;

            const updateDepartment = await pool.query("UPDATE departments SET department= $1 WHERE department_id = $2",
                [department, id])

            res.json("Department was updated!.....")
        } catch (err) {
            console.error(err.message);
        }
    }

    // [CREATE] /departments
    async create(req, res) {
        try {
            const { department } = req.body

            const newDepartment = await pool.query("INSERT INTO departments (department) VALUES ($1) RETURNING *", [department])

            res.json(newDepartment.rows[0])
            // console.log("Create a Department succesfully.....")
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = new EmployeeController