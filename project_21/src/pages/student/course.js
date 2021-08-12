import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import moment from 'moment'
import { useHistory, useLocation } from "react-router-dom"

import Navbar from '../../components/student/navbar'
import firebase from 'firebase/app'

const Course = (props) => {
    const location = useLocation()
    const course_id = location.state.id
    const [course, setCourse] = useState(location.state.course)
    const [noData, setNoData] = useState(false)
    const [teacher, setTeacher] = useState([])
    const [addedAt, setAddedAt] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [cid, setCid] = useState()
    const [isStudent, SetIsStudent] = useState()
    const history = useHistory()
    const [subscribed, setSubscribed] = useState()
    const [inCourse, setInCourse] = useState(false)


    const addToMyCourse = async (courseId) => {
        const student = auth.currentUser
        try {
            const studentData = await db.collection("users")
                .where("email", "==", student.email)
                .get()
            const snapshot = studentData.docs[0]
            const currentStudentData = snapshot.id

            await db.collection("users").doc(currentStudentData).update({
                courses: firebase.firestore.FieldValue.arrayUnion(courseId)
            })
            history.push("/courses")
        } catch (error) {
            console.log("Message d'erreur : " + error.message);
            console.log(courseId);
        }
    }

    const getTeacher = async () => {
        await db.collection("users").doc(course.teacher).get().then((snapshot)=>{
            const queryTeacher = {
                id: snapshot.id,
                ...snapshot.data()
            }
            setTeacher(queryTeacher)
        })
    }

    useEffect(() => {
        const getUser = async () => {
            const user = auth.currentUser
            //setCurrentUser(user)
            const userEmail = user.email
            console.log(userEmail);

            await db.collection("users")
                .where("email", "==", userEmail)
                .get()
                .then((userData) => {
                    const snapshot = userData.docs[0]
                    setCurrentUser(snapshot.data())
                    //console.log(currentUser.courses[0]);
                    const allCourses = currentUser.courses
                    if(allCourses.includes(course_id)){
                        setInCourse(true)
                    } else {
                        setInCourse(false)
                    }
                    console.log(currentUser)
                })
        }
        getTeacher()
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
                            {
                                inCourse ? 
                                <button className="btn btn-secondary" disabled>Déjà inscrit</button>
                                :
                                <button className="btn btn-success" onClick={() => addToMyCourse(course.id)}>Ajouter à mes cours</button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Course
