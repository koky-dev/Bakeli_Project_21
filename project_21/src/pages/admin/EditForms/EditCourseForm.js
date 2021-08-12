import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import moment from 'moment'
import { useLocation } from 'react-router'
import { BeatLoader } from 'react-spinners'

const EditCourseForm = (props) => {
    const location = useLocation()
    const course_id = location.state.id
    const [teachers, setTeachers] = useState([])
    const [teacherCourse, setTeacherCourse] = useState([])
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState(location.state.course.title)
    const [lessons, setLessons] = useState(location.state.course.lessons)
    const [duration, setDuration] = useState(location.state.course.duration)
    const [teacher, setTeacher] = useState(location.state.course.teacher)

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            db.collection("courses").doc(course_id).update({
                title: title,
                lessons: lessons,
                duration: duration,
                teacher: teacher
            })
                .then(() => {
                    console.log("Successfully Update!");
                })
        } catch (error) {
            console.log("Message d'erreur : " + error.message);
        }
    }

    const getTeachers = async () => {
        await db.collection("users")
            .where("status", "==", "teacher")
            .get()
            .then((queryTeacher) => {
                const teachers = queryTeacher.docs.map((teacher) => ({
                    id: teacher.id,
                    ...teacher.data()
                }))
                setTeachers(teachers)
            })
            .catch(error => console.log(error));
    }

    const getCourse = async () => {
        setLoading(true)
        await  db.collection('users').doc(teacher)
        .get()
        .then((teacherCourse) => {
            if (teacherCourse.exists) {
                const teacherQuery = {
                    id: teacherCourse.id,
                    ...teacherCourse.data()
                }
                setTeacherCourse(teacherQuery)
                setLoading(false)
            } else {
                //setNoData(true)
            }
        })

    }

    useEffect(() => {
         getCourse()
        getTeachers()
    }, [])

    return (
        <div className="container">
            {
                loading ?
                    <BeatLoader />
                    :
                    <div style={{ marginTop: 20 + 'px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <input type="text"
                                        value={title}
                                        className="form-control"
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Titre" />
                                </div>
                                <div className="col">
                                    <input type="number"
                                        value={lessons}
                                        className="form-control"
                                        onChange={(e) => setLessons(e.target.value)}
                                        placeholder="Nombre de leçons" />
                                </div>
                            </div><br />
                            <div className="row">
                                <div className="col">
                                    <input type="number"
                                        value={duration}
                                        className="form-control"
                                        onChange={(e) => setDuration(e.target.value)}
                                        placeholder="Durée par jour" />
                                </div>
                                <div className="col">
                                    <select className="form-control" onChange={(e) => setTeacher(e.target.value)}>
                                        <option value="">{teacherCourse.fullname}</option>
                                        {
                                            teachers.map((teacher) => (
                                                <option key={teacher.id} value={teacher.id}>{teacher.fullname}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                            </div><br />
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-lg btn-primary">Mettre à jour</button>
                                </div>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

export default EditCourseForm
