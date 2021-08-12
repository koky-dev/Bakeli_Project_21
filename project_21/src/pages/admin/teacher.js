import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import moment from 'moment'
import { useHistory, useLocation } from "react-router-dom"

import Navbar from '../../components/admin/NavbarAdmin'

const Teacher = (props) => {
    const location = useLocation()
    const teacher_id = location.state.id
    const [fullname, setFullname] = useState(location.state.teacher.fullname)
    const [archived, setArchived] = useState(location.state.teacher.archived)
    const [email, setEmail] = useState(location.state.teacher.email)
    const [numberOfCourse, setNumberOfCourse] = useState()

    const history = useHistory()


    
    const deleteTeacher = async (TeacherId) => {
        try {
            await db.collection('users').doc(TeacherId).delete().then(()=>{
                history.push("/teachers")
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const archiveTeacher = async (TeacherId) => {
        try {
            await db.collection('users').doc(TeacherId).update({
                archived: true
            }).then(()=>{
                history.push("/teachers")
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const getMyCourses = async () => {
        await db.collection('courses')
                .where("teacher", "==", teacher_id)
                .get()
                .then((snapshot)=>{
                    setNumberOfCourse(snapshot.size)
        })
    }


    useEffect(() => {
        getMyCourses()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                {

                    <div class="card mt-1 text-center mx-auto" style={{ width: 300 + "px" }}>
                        <img class="card-img-top"
                            style={{ height: 200 + "px" }}
                            src={location.state.teacher.image ?
                                location.state.teacher.image
                                :
                                "https://www.bakeli.tech/wp-content/uploads/2020/02/Logo-bakeli.png"}
                            alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">{fullname}</h5>
                            <p class="card-text"> Email : {email}</p>
                            <p class="card-text"> Archivé : {archived ? "Oui" : "Non"}</p>
                            <p class="card-text"> Cours dispensés : {numberOfCourse}</p>
                        </div>
                        <div className="card-footer bg-transparent border-success">
                            <button className="btn btn-danger" onClick={() => deleteTeacher(teacher_id)}>Supprimer</button>
                            {
                                archived ? 
                                <button disabled className="btn btn-secondary">Archivé</button>
                                :
                                <button className="btn btn-primary" onClick={()=>archiveTeacher(teacher_id)}>
                                    Archiver
                                </button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Teacher
