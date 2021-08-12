import React, { useState } from 'react'
import { ExitToAppRounded } from "@material-ui/icons";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from 'react-router-dom'
import AllCourses from '../../components/student/AllCourses'
import Navbar from "../../components/student/navbar";
import Calendar from 'react-calendar'
import Footer from '../../components/Footer'

const Courses = () => {
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
                        <h1>Liste des cours</h1>
                        <div style={{marginLeft: "auto", marginRight: "auto"}}>
                            <AllCourses />
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

export default Courses
