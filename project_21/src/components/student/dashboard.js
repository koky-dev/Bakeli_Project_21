import React from "react";
import * as FaIcons from 'react-icons/fa'
import { ExitToAppRounded } from "@material-ui/icons";
import { Button } from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext"
import Navbar from "./navbar"

import '../../index.css'

function DashboardStudent() {
    const {logout} = useAuth()
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
            <Navbar/>
            <h1>This is the Student's Dashboard Page</h1>
            <Button onClick={handleLogOut}><ExitToAppRounded/></Button>
        </div>
    )
}