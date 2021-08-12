import React, { useState, Component, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa';
import { ExitToApp, DateRange, Settings, Add, Menu, School } from "@material-ui/icons";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import '../index.css'

const Sidebar = () => {
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
                        <a href="" className="nav-link active">
                            <Menu className="nav-icon" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="nav-link">
                            <DateRange className="nav-icon" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link to="/actions" className="nav-link">
                            <Add className="nav-icon" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/teachers" className="nav-link">
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

export default Sidebar
