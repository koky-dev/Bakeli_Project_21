import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'

const AllCourses = () => {
    const [coursesDetails, setCoursesDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState([])
    const [isAdmin, SetIsAdmin] = useState()


    useEffect(() => {
        //const courses = []
        setLoading(true)
        db.collection('courses')
            .get()
            .then((snapshot) => {
                const courses = snapshot.docs.map((course) => ({
                    // doc.data() is never undefined for query doc snapshots
                    id: course.id,
                    ...course.data()
                }))
                setLoading(false)
                setCoursesDetails(courses)
            })
            .catch(error => console.log(error));

    }, [])

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
                //const userCourse = currentUser.courses
                //console.log(userCourse);

                return currentUser.status == "admin" ? SetIsAdmin(true) : SetIsAdmin(false)
                //console.log(currentUser)
            })
    }

    useEffect(() => {
        getUser()
    }, [])


    const addToMyCourse = async (courseId) => {
        const student = auth.currentUser
        try {
            await db.collection("users")
                .where("email", "==", student.email)
                .get()
                .then((studentData) => {
                    const snapshot = studentData.docs[0]
                    const currentStudentData = snapshot.id

                    db.collection("users").doc(currentStudentData).update({
                        courses: firebase.firestore.FieldValue.arrayUnion(courseId)
                    })
                    window.location.reload()
                })
                  
        } catch (error) {
            console.log("Message d'erreur : " + error.message);
        }
    }


    return (
        <div>
            <div className="row">
                {
                    loading ?
                        <div className="main">
                            <BeatLoader loading size={72} />
                        </div>
                        :
                        coursesDetails.map((course) => (
                            <div key={course.id} className="col-md-6 col-lg-4">
                                <div className="card" style={{ width: 18 + "rem" }}>
                                    <img className="card-img-top" src={course.image ? course.image : "https://www.bakeli.tech/wp-content/uploads/2020/02/Logo-bakeli.png"} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{course.title}</h5>
                                        <p className="card-text"></p>
                                        {
                                            course.status == "archived" ?
                                                <button className="btn btn-secondary">Archivé</button>
                                                :
                                                <Link
                                                    to={{
                                                        pathname: "/student/course_details",
                                                        state: {
                                                            id: course.id,
                                                            course: course
                                                        }
                                                    }}
                                                    className="btn btn-primary">
                                                    Voir détails
                                                </Link>
                                        }
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default AllCourses
