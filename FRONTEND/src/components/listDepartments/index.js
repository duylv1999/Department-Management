import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import AddDepartment from "../addDepartment";
import UpdateDepartment from "../updateDepartment";

function ListDepartments({setAuth}) {
    const [dataDepartment, setDataDepartment] = useState([]);
    const [employees, setEmployees] = useState([])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setAuth(false)
    }

    const getDepartments = async () => {
        try {
            const response = await fetch("http://localhost:5000/departments");
            console.log("Fetch data successfully......");

            const jsonData = await response.json();
            setDataDepartment(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getDepartments()
        getEmployees()
    }, []);

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

    async function handleDelete(id) {
        console.log(id);
        try {
            const deleteDepartment = await fetch(
                `http://localhost:5000/departments/${id}`,
                {
                    method: "DELETE",
                }
            );
            // console.log('Matching....')

            getDepartments();
            getEmployees();
            // setDataDepartment(dataDepartment.filter(e => e.department_id !== id))
            // console.log(employees)
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
            <div className="container">
                <div className="header">List Departments</div>
                <button className="btn btn-light" style={{ justifyContent: 'end' }}>
                    {!setAuth 
                        ? <Link to="/login">Login</Link> 
                        : <Link to="/logout" onClick={handleLogout}>Logout</Link>
                    }
                </button>
            </div>
        </nav>
        <div className="container mt-5">
            <AddDepartment getDepartments={getDepartments}/>
            <form className="form__add_employee" id="myModal">
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Deparment</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataDepartment.map((element, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.department}</td>
                                <td>
                                    <UpdateDepartment element={element} getDepartments={getDepartments}/>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-delete"
                                        onClick={() =>
                                            handleDelete(element.department_id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>           
        </>
    )
}

export default ListDepartments;