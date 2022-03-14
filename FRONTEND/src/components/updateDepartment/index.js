import React, { useState, useEffect, useRef } from "react";
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

function UpdateDepartment({element, getDepartments}) {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [department, setDepartment] = useState(element.department)

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

    const handleUpdate = async e => {
        e.preventDefault();

        try {
            const body = { department }
            const putDepartment = await fetch(`http://localhost:5000/departments/${element.department_id}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });

            getDepartments()
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <>
            <button type="button" className="btn btn-success" onClick={openModal}>Edit</button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update department</h2>
            <form className="form__update_department" id="myModal" onSubmit={handleUpdate}>
                <div className="mb-3 mt-3">
                    <input value={department} type="text" className="form-control" id="department" placeholder="Enter department" name="department" onChange={(e) => setDepartment(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-warning" onSubmit={handleUpdate}>Update</button>
                <button className="btn btn-danger btn_close" onClick={closeModal}>Close</button> 
            </form>

            </Modal>
        </>
    )
}

export default UpdateDepartment;