import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import moment from 'moment'
import { useHistory } from "react-router-dom"

import Navbar from '../../components/admin/NavbarAdmin'
import id from 'date-fns/esm/locale/id/index.js'

const Course = (props) => {
    const [course, setCourse] = useState([])
    const [noData, setNoData] = useState(false)
    const [teacher, setTeacher] = useState([])
    const [addedAt, setAddedAt] = useState()
    const [currentUser, setCurrentUser] = useState()
    const history = useHistory()


    
    const deleteCourse = async (courseId) => {
        try {
            await db.collection('courses').doc(courseId).delete().then(()=>{
                history.push("/admin_home")
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const archiveCourse = async (courseId) => {
        try {
            await db.collection('courses').doc(courseId).update({
                status: "archived"
            }).then(()=>{
                history.push("/admin_home")
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {

        const getCourse = async () => {
            const course_id = props.location.courseProps.id
            await db.collection('courses').doc(course_id)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const queryCourse = {
                            id: doc.id,
                            ...doc.data()
                        }
                        const addedAt = moment(queryCourse.addedAt.toDate()).calendar()
                        setAddedAt(addedAt)
                        db.collection('users').doc(queryCourse.teacher)
                            .get()
                            .then((teacher) => {
                                if (teacher.exists) {
                                    return setTeacher(teacher.data())
                                } else {
                                    setNoData(true)
                                }
                            })
                        setCourse(queryCourse)
                    } else {
                        console.log("User does not exist")
                    }
                })

        }

        getCourse()
    }, [])


    useEffect(() => {
        const getUser = async () => {
            const user = auth.currentUser
            const userEmail = user.email

            await db.collection("users")
                .where("email", "==", userEmail)
                .get()
                .then((userQuery) => {
                    const snapshot = userQuery.docs[0]
                    setCurrentUser(snapshot.data())
                })
        }

        getUser()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                {

                    <div class="card mt-1 text-center" style={{ width: 300 + "px" }}>
                        <img class="card-img-top"
                            style={{ height: 200 + "px" }}
                            src={course.image ?
                                course.image
                                :
                                "https://www.bakeli.tech/wp-content/uploads/2020/02/Logo-bakeli.png"}
                            alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">{course.title}</h5>
                            <p class="card-text"> Dispensé par : {teacher.fullname}</p>
                            <p class="card-text"> Nombre de leçons : {course.lessons}</p>
                            <p class="card-text"> Nombre de minutes par jour' : {course.duration}</p>
                            <p class="card-text"> Date de début : {course.startAt ? course.startAt : "Plus tard"}</p>
                            <p class="card-text"><small class="text-muted">Ajouté à {addedAt}</small></p>
                        </div>
                        <div className="card-footer bg-transparent border-success">
                            <button className="btn btn-danger" onClick={() => deleteCourse(course.id)}>Supprimer</button>
                            {
                                course.status == "archived" ? 
                                <button disabled className="btn btn-secondary">Archivé</button>
                                :
                                <button className="btn btn-primary" onClick={()=>archiveCourse(course.id)}>
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

export default Course
