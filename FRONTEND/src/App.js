import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { useState } from "react"
import { BrowserRouter, Navigate, Routes, Route} from "react-router-dom"

// components
import Home from './components/home'
import Login from './components/login'
import DashBoard from './components/dashboard'
import ListDepartments from './components/listDepartments'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" />} />
                <Route path="/logout" element={<Navigate to="/" />} />
                <Route path="/dashboard" element={isAuthenticated ? <DashBoard setAuth={setAuth} /> : <Navigate to="/login" />}  />
                <Route path="/departments" element={isAuthenticated ? <ListDepartments setAuth={setAuth}/> : <Navigate to="/login" />}  />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
