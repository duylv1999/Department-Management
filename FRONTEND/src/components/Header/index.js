import { NavLink, Link } from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
            <div className="container">
                <div className="header">List Employees</div>
                <button style={{ justifyContent: 'end' }}>
                    <Link to="/login">Login</Link>
                </button>
            </div>
        </nav>
    )
}

export default Header;