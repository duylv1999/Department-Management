import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  Modal.setAppElement('#root');
  
function UpdateEmployee({employee}) {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [firstname, setFirstName] = useState(employee.firstname)
    const [lastname, setLastName] = useState(employee.lastname)
    const [email, setEmail] = useState(employee.email)
    const [selectedOption, setSelectedOption] = useState(employee.department_id)
    const [dataDepartment, setDataDepartment] = useState([])
    
    const firstNameRef = useRef()

    const getDepartments = async () => {
        try {
            const response = await fetch("http://localhost:5000/departments")
            console.log("Fetch data successfully......")
            
            const jsonData = await response.json()
            setDataDepartment(jsonData)
        } catch (err) {
            console.error(err.message)
        }

    }

    useEffect(() => {
        getDepartments()
    }, [])

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleUpdate = async e => {
        e.preventDefault();

        try {
            const body = { firstname, lastname, email, department_id: selectedOption }

            const putEmployee = await fetch(`http://localhost:5000/employees/${employee.employee_id}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });

            console.log(putEmployee)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
            <button type="button" onClick={openModal} className="btn btn-success">Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update Employee</h2>
                <form className="form__update_employee" id="myModal" onSubmit={handleUpdate} >
                <div className="mb-3 mt-3">
                    <input ref={firstNameRef} value={firstname} type="text" className="form-control" id="firstname" placeholder="Enter first name" name="firstname" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3 mt-3">
                    <input type="text" value={lastname} className="form-control" id="lastname" placeholder="Enter last name" name="lastname" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="mb-3 mt-3">
                    <input type="email" value={email} className="form-control" id="email" placeholder="Enter your email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3 mt-3">
                    <select class="form-select" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                        <option>Please choose department</option>
                        {dataDepartment.map((option, index) => (
                            <option key={index} value={option.department_id}>{option.department}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-warning" onSubmit={handleUpdate}>Update</button>
                <button className="btn btn-danger btn_close" onClick={closeModal}>Close</button> 
                </form>
            </Modal>
        </div>
    )
}

export default UpdateEmployee;