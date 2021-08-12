import React, { Component, useState, useEffect } from "react";
import * as FaIcons from 'react-icons/fa';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Tilt from 'react-tilt';
import usePasswordToggle from "../hooks/usePasswordToggle";
import Form from 'react-bootstrap/Form'
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { db, auth } from '../firebase'

function RegisterPage() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmitTeacher = () => {
        // Submit avec Professeur
    }

    const resetForm = () => {
        setFullname('')
        setEmail('')
        setPassword('')
        setStatus('')
    }


    const handleSubmit = (e) => {
        // Submit avec Administrateur
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                user_id:cred.user.uid,
                email:email,
                fullname:fullname,
                status: status
            })
        }).then(() => resetForm())
        console.log(fullname, email, status);
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
                            <div className="col-md-6 my-auto h-100 justify-content-center">
                                <form className="login100-form validate-form" onSubmit={handleSubmit} id="register-form">
                                    <span className="login100-form-title" >
                                        Register
                            </span>
                                    <div className="wrap-input100 validate-input"
                                        data validate="Valid matricule is required: exabc.123" >
                                        <input className="input100"
                                            type="text"
                                            name="matricule"
                                            placeholder="Fullname"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)} />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <FaIcons.FaUser />
                                        </span>
                                    </div>
                                    <div className="wrap-input100 validate-input"
                                        data validate="Valid matricule is required: exabc.123" >
                                        <input className="input100"
                                            type="email"
                                            name="matricule"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)} />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <FaIcons.FaEnvelope />
                                        </span>
                                    </div>
                                    <div className="wrap-input100 validate-input"
                                        data validate="Password is required" >
                                        <input className="input100"
                                            type={PasswordInputType}
                                            name="password"
                                            placeholder="Password"
                                            id="inputPassword"
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)} />
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
                                    <div className="wrap-input100 validate-input"
                                        data validate="Valid matricule is required: exabc.123" >
                                        <Form.Control as="select" select className="" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                                            <option value="" disabled selected>Status</option>
                                            <option value="admin">Admin</option>
                                            <option value="student">Student</option>
                                        </Form.Control>
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
                                    Sign Up
                                </button>
                                    </div>
                                    <div className="text-center p-t-12">
                                        <span className="txt1">
                                            Alreaday signed in ? &nbsp;
                                    <Link to="/" className="txt2"
                                                href="" >
                                                Log In ?
                                    </Link>
                                        </span>
                                    </div>
                                </form>
                            </div>

                            <div className="col-md-6 right my-auto mx-auto h-100">
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RegisterPage;