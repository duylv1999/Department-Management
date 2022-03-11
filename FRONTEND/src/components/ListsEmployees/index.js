import { useEffect, useState } from 'react'
import AddEmployee from '../AddEmployee'
import Departments from '../Deparments'
import UpdateEmployee from '../UpdateEmployee'

function ListsEmployees() {

    const [ employees, setEmployees] = useState([])

    // [GET] Employees
    const getEmployees = async () => {
        try {
            const response = await fetch("http://localhost:5000/employees")
            const jsonData = await response.json()

            setEmployees(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getEmployees()
    }, [])

    async function handleDelete (id) {
        try {
            const deleteEmployee = await fetch(`http://localhost:5000/employees/${id}`, {
                method: "DELETE"
            });
            // setEmployees(employees.filter( employee => employee.employee_id !== id))
            // console.log(employees)
            getEmployees()
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleAdd = (newEmployee) => {
        setEmployees( emp => [...emp, newEmployee ])
    }

    return (
        <div className='container mt-5'>
            <AddEmployee getEmployees={getEmployees} />
            <Departments />
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Employee Number</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td className="d-flex">
                                <UpdateEmployee employee={employee}/>
                                <button type="button" className="btn btn-danger btn-sm btn-delete">
                                    <i className="fas fa-times" onClick={() => handleDelete(employee.employee_id)}>Delete</i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default ListsEmployees;