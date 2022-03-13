import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";

// components
import Header from './components/header'
import ListsEmployees from './components/listsEmployees'
import Login from './components/login'


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean)
    }

    return (
        <div className="App">
            <Header />
            <ListsEmployees />
            {/* <p><Link to="/login">login</Link></p> */}

            {/* <Route exact path="/" element={props => !isAuthenticated
                                    ? (<Login {...props} setAuth={setAuth} />)
                                    : (<Navigate to="/Dashboard" />)}
                                /> */}
            {/* <Route path="/login" element={<Login />}></Route> */}
        </div>
    );
}

export default App;
