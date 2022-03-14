import { NavLink, Link } from "react-router-dom";


function Header({setAuth}) {

    const handleLogout = () => {
        localStorage.removeItem("token")
        setAuth(false)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
            <div className="container">
                <div className="header">{setAuth ? 'Lists Employees' : 'Home'}</div>
                <button className="btn btn-light" style={{ justifyContent: 'end' }}>
                    {!setAuth 
                        ? <Link  to="/login">Login</Link > 
                        : <Link  to="/logout" onClick={handleLogout}>Logout</Link>
                    }
                </button>
            </div>
        </nav>
    )
}

export default Header;