const pool = require("../../../db")

class employeeController {

    // [GET] /employees
    async index(req, res) {
        try {
            const allEmployees = await pool.query(
                "SELECT employee_id, firstname, lastname, email, departments.department, departments.department_id FROM employees JOIN departments ON employees.department_id = departments.department_id"
            );

            res.json(allEmployees.rows)
        } catch (err) {
            console.error(err.message);
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

            res.json(newEmployee.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    }

    // [UPDATE] /employees
    async update(req, res) {
        try {
            const { id } = req.params;
            const { firstname, lastname, email, department_id } = req.body;

            const updateEmployee = await pool.query("UPDATE employees SET  firstname = $1, lastname = $2, email = $3, department_id= $4 WHERE employee_id = $5",
                [firstname, lastname, email, department_id, id])

            res.json("Employee was updated!.....")
        } catch (err) {
            console.error(err.message);
        }
    }

    // [DELETE] employee
    async delete(req, res) {
        try {
            const { id } = req.params;

            const deleteEmployee = await pool.query("DELETE FROM employees WHERE employee_id =$1", [id])

            res.json("Employee was deleted!.....")
        } catch (err) {
            console.error(err.message);
        }
    }
}


module.exports = new employeeController;