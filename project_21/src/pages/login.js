import React, { Component, useState, useEffect } from "react";
import * as FaIcons from 'react-icons/fa';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Tilt from 'react-tilt';
import usePasswordToggle from "../hooks/usePasswordToggle";
import { Link } from "react-router-dom";

function LoginPage() {
    const handleSubmitTeacher = () => {
        // Submit avec Professeur
    }


    const handleSubmitAdmin = () => {
        // Submit avec Administrateur
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
                            <form className="login100-form validate-form" >
                            <span className="login100-form-title" >
                                Login
                            </span>
                            <div className="wrap-input100 validate-input"
                                data validate="Valid matricule is required: exabc.123" >
                                <input className="input100"
                                    type="email"
                                    name="matricule"
                                    placeholder="Email" />
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
                                    id="inputPassword" />
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
                                </span><br/>
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