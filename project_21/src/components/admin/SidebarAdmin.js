import React, { useState, Component, useEffect } from 'react'
import { ExitToApp, DateRange, Person, PersonAdd, Menu, School } from "@material-ui/icons";
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function SidebarAdmin() {
    const { logout } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

    const handleLogOut = async () => {
        setError('')

        try {
            await logout()
            history.push("/")
        } catch (error) {
            setError("Failed to log out")
        }
    }

    return (
        <div>
            <nav className="sidebar">
                <ul>
                    <li>
                        <Link to="/admin_home">
                            <img className="rounded-circle" src="https://www.bakeli.tech/wp-content/uploads/2020/02/Logo-bakeli.png" alt="Logo Volkeno" />
                        </Link>
                    </li>
                </ul>
                <ul className="nav flex-column center-icons">
                    <li className="nav-item">
                        <Link to="/courses" className="nav-link active">
                            <Menu className="nav-icon" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="" className="nav-link">
                            <DateRange className="nav-icon" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link to="/actions" className="nav-link">
                            <PersonAdd className="nav-icon" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/teachers" className="nav-link">
                            <Person className="nav-icon" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/students" className="nav-link">
                            <School className="nav-icon" />
                        </Link>
                    </li>
                </ul>
                <ul className="nav fixed-bottom logout">
                    <li>
                        <a href="">
                            <ExitToApp onClick={handleLogOut} />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SidebarAdmin