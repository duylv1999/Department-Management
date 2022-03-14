import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Departments({ getEmployees }) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    Modal.setAppElement("#root");

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [dataDepartment, setDataDepartment] = useState([]);

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
        getDepartments();
    }, []);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
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

    return (
        <>
            <Link to="/departments">
                <button
                    className="btn btn-secondary btn-management"
                    onClick={openModal}
                >
                    <FontAwesomeIcon icon={faBarsProgress} />
                    <span style={{ paddingLeft: "10px" }}>
                        Deparment management
                    </span>
                </button>
            </Link>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Deparment management
                </h2>
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
                            {dataDepartment.map((e, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{e.department}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-delete"
                                            onClick={() =>
                                                handleDelete(e.department_id)
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
            </Modal>
        </>
    );
}

export default Departments;
