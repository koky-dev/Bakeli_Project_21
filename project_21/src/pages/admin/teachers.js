import React, { useState } from 'react'
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from 'react-router-dom'
import AllTeachers from '../../components/admin/AllTeachers'
import Navbar from "../../components/admin/NavbarAdmin";
import Calendar from 'react-calendar'
import Footer from '../../components/Footer'

const Teachers = () => {
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
        <>
            <div className="container-fluid">
                <Navbar />
                <div className="row">
                    <div className="col-md-12 col-lg-10 main">
                        <h1>Liste des Enseignats</h1><br/>
                        <AllTeachers />
                    </div>
                    <div className="col-md-12 col-lg-2">
                        Calendrier
                        <Calendar />
                    </div>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Teachers
