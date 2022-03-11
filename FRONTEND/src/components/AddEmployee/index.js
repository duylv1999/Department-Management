import React, { useState, useEffect, useRef } from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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

function AddEmployee ({getEmployees}) {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dataDepartment, setDataDepartment] = useState([])
    const [selectedOption, setSelectedOption] = useState()

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
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {

            const body = { firstname, lastname, email, department_id: selectedOption } 
            const addEmployee = await fetch('http://localhost:5000/employees', {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })

            getEmployees()  

            setFirstName('')
            setLastName('')
            setEmail('')
            firstNameRef.current.focus()

            console.log('Add employee successfully.......')
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <>
            <button className="btn btn-info" onClick={openModal}>
                <FontAwesomeIcon icon={faPlus} />
                <span style={{paddingLeft: '10px'}}>Add employee</span>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Modal add employee</h2>
            <form className="form__add_employee" id="myModal" onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary" onSubmit={handleSubmit} >Add</button>
                <button className="btn btn-danger btn_close" onClick={closeModal}>Close</button> 
            </form>
            </Modal>
        </>
    )
}

export default AddEmployee;