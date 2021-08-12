import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import { useHistory, useLocation } from "react-router-dom"

import Navbar from '../../components/admin/NavbarAdmin'

const Student = () => {
    const location = useLocation()
    const student_id = location.state.id
    const [fullname, setFullname] = useState(location.state.student.fullname)
    const [archived, setArchived] = useState(location.state.student.archived)
    const [email, setEmail] = useState(location.state.student.email)
    const [course, setCourse] = useState(location.state.courses)
    const [numberCourses, setNumberCourses] = useState()


    console.log(course);

    const history = useHistory()


    
    const deleteStudent = async (studentId) => {
        try {
            await db.collection('users').doc(studentId).delete().then(()=>{
                history.push("/students")
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const archiveStudent = async (studentId) => {
        try {
            await db.collection('users').doc(studentId).update({
                archived: true
            }).then(()=>{
                history.push("/students")
            })
        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        //getStudent()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                {

                    <div class="card mt-1 text-center mx-auto" style={{ width: 300 + "px" }}>
                        <img class="card-img-top"
                            style={{ height: 200 + "px" }}
                            src={location.state.student.image ?
                                location.state.student.image
                                :
                                "https://www.bakeli.tech/wp-content/uploads/2020/02/Logo-bakeli.png"}
                            alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">{fullname}</h5>
                            <p class="card-text"> Email : {email}</p>
                            <p class="card-text"> Archivé : {archived ? "Oui" : "Non"}</p>
                            <p class="card-text"> Nombre de cours inscrit : {course ? course : "0"}</p>
                        </div>
                        <div className="card-footer bg-transparent border-success">
                            <button className="btn btn-danger" onClick={() => deleteStudent(student_id)}>Supprimer</button>
                            {
                                archived ? 
                                <button disabled className="btn btn-secondary">Archivé</button>
                                :
                                <button className="btn btn-primary" onClick={()=>archiveStudent(student_id)}>
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

export default Student
