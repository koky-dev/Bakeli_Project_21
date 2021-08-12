import React, { Component, useState, useEffect } from "react";
import * as FaIcons from 'react-icons/fa';
import { db, auth } from '../firebase'
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Tilt from 'react-tilt';
import usePasswordToggle from "../hooks/usePasswordToggle";
import { Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { login } = useAuth()

    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(email, password)
            const query = await db.collection('users').where("email", "==", email).get()
            const snapshot = query.docs[0]
            const userCreds = snapshot.data()

            // Vérification du status pour la redirection
            if (userCreds.status == "admin") {
                history.push("/admin_home")
            } else{
                history.push("/student_home")
            }
        } catch (error) {
            setError("Email ou Mot de passe invalide")
        }
    }


    const handleSubmitStudent = () => {
        // Submit avec Etudiant
    }

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    return (
        <main>
            <div className="limiter" >
                <div className="container-login100" >
                    <div className="wrap-login100" >
                        <div className="row">
                            <div className="col-md-6 my-auto">
                                <Tilt className="Tilt"
                                    options={
                                        { max: 50 }
                                    } >
                                    <div className="Tilt-inner login100-pic" data-tilt>
                                        <img src="./logo.jpeg"
                                            alt="IMG" />
                                    </div>
                                </Tilt>
                            </div>

                            <div className="col-md-6 right my-auto">
                                <form className="login100-form validate-form" onSubmit={handleSubmit}>
                                    <span className="login100-form-title" >
                                        Se Connecter
                                    </span>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <div className="wrap-input100 validate-input"
                                        data validate="Valid matricule is required: exabc.123" >
                                        <input className="input100"
                                            type="email"
                                            name="matricule"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <FaIcons.FaUser />
                                        </span>
                                    </div>

                                    <div className="wrap-input100 validate-input"
                                        data validate="Password is required" >
                                        <input className="input100"
                                            type={PasswordInputType}
                                            name="password"
                                            placeholder="Password"
                                            id="inputPassword"
                                            onChange={(e) => setPassword(e.target.value)} />
                                        < span className="focus-input100">
                                        </span>
                                        <span className="symbol-input100">
                                            <FaIcons.FaLock />
                                        </span >
                                        <span className="symbol-input200">
                                            <i className="toggle-password" >
                                                {ToggleIcon}
                                            </i>
                                        </span>
                                    </div>

                                    <div className="container-login100-form-btn" >
                                        <button className="login100-form-btn"
                                            style={
                                                { background: '#ea4335' }
                                            }
                                            name="logInadmin"
                                            type="submit" >
                                            <i className="fa-signIn" >
                                                <FaIcons.FaSignInAlt />
                                            </i>
                                    Sign In
                                </button>
                                    </div>
                                    <div className="text-center p-t-12">
                                        <span className="txt1">
                                            Forgot &nbsp;
                                    <a className="txt2"
                                                href="" >
                                                Password ?
                                    </a>
                                        </span><br />
                                        <span className="txt1">
                                            Not signed up yet ? &nbsp;
                                    <Link to="/register" className="txt2"
                                                href="" >
                                                Sign Up
                                    </Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LoginPage;