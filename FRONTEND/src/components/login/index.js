import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login({setAuth}) {

    const [inputs, setInputs] = useState({
        user_name:'',
        user_password:''
    });

    console.log(inputs)
    const { user_name, user_password} = inputs

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = { user_name, user_password} 

            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })

            console.log("Matching......")
            const parseRes = await response.json()
            // console.log(parseRes)

            if(parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true)
                toast.success("Login successfully");
            }else{
                setAuth(false)
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="formLogin">
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card border-0 shadow rounded-3 my-5">
                            <div class="card-body p-4 p-sm-5">
                            <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
                            <form onSubmit={onSubmitForm}>
                                <div className="form-control form-floating mb-3">
                                    <input type="text" id="username" name="user_name" value={user_name} onChange = { e => handleChange(e)}  placeholder="Enter your username..." style= {{width: '100%', border: 'none', outline: 'none'}}/>
                                </div>
                                <div className="form-control form-floating mb-3">
                                    <input type="password" name="user_password" value={user_password} onChange = { e => handleChange(e)} placeholder="Enter your password..." id="username" required style= {{width: '100%', border: 'none', outline: 'none'}}/>
                                </div>
                                <div class="d-grid">
                                    <input type="submit" className="btn btn-primary btn-login text-uppercase fw-bold" value="Login" onSubmit={onSubmitForm}/>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;