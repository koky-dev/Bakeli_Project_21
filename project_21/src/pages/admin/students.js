import React, { useState } from 'react'
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from 'react-router-dom'
import AllStudents from '../../components/admin/AllStudents'
import Navbar from "../../components/admin/NavbarAdmin";
import Calendar from 'react-calendar'
import Footer from '../../components/Footer'

const Students = () => {
    const { logout } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

    return (
        <>
            <div className="container-fluid">
                <Navbar />
                <div className="row">
                    <div className="col-md-12 col-lg-10 main">
                        <h1>Liste des étudiants</h1>
                        <div style={{marginLeft: "auto", marginRight: "auto"}}>
                            <AllStudents />
                        </div>
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

export default Students
