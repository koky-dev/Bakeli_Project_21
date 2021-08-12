import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">Active</a>
                </li>
                <li className="nav-item">
                    <Link to="/test1" className="nav-link" href="#">Link</Link>
                </li>
                <li className="nav-item">
                    <Link to="/test2" className="nav-link" href="#">Link</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        </nav>
    )
}

export default Header
