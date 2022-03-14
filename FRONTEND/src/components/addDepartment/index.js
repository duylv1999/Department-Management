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

    function AddDepartment({getDepartments}) {
        
        let subtitle;
        const [modalIsOpen, setIsOpen] = React.useState(false);
        const [department, setDepartment] = useState('')

        const inputDepartmentRef = useRef()

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

        const handleSubmit = async (e) => {
            e.preventDefault()

            try {
                const body = { department } 
                console.log(body)
                const addDepartment = await fetch('http://localhost:5000/departments', {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(body)
                })
    
                getDepartments()  
                setDepartment('')

                inputDepartmentRef.current.focus()
    
                console.log('Add department successfully.......')
            } catch (err) {
                console.error(err.message)
            }
        }

        return(
            <>
            <button className="btn btn-info"  onClick={openModal}>
                <FontAwesomeIcon icon={faPlus} />
                <span style={{padding: '10px'}}>Add department</span>
            </button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Modal add department</h2>
                <form className="form__add_employee" id="myModal" onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <input type="text"
                            ref = {inputDepartmentRef} 
                            value={department} 
                            className="form-control" 
                            id="department" 
                            placeholder="Enter department" 
                            name="department" 
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onSubmit={handleSubmit} >Add</button>
                    <button className="btn btn-danger btn_close" onClick={closeModal}>Close</button> 
                </form>
            </Modal>
            </>
        )
    }

export default AddDepartment;