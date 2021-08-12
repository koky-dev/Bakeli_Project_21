import React, {useState, useEffect} from 'react'
import { db } from '../../firebase'

const EditCourse = ({ course_id }) => {
    //const { courseId } = course_id
    const [course, setCourse] = useState([])
    const [teachers, setTeachers] = useState([])
    const [teacherCourse, setTeacherCourse] = useState([])


    useEffect(() => {
        const getCourse = async (courseId) => {
            await db.collection("courses").doc(courseId).get().then((doc) => {
                if (doc.exists) {
                    const snapshot = {
                        id: doc.id,
                        ...doc.data()
                    }
                    db.collection("users").doc(snapshot.teacher).get().then((teacher) => {
                        const queryTeacher = {
                            id: teacher.id,
                            ...teacher.data()
                        }
                    setTeacherCourse(queryTeacher)
                    })
                    setCourse(snapshot)
                }

            })

        }

        getCourse(course_id)
    }, [])

    return (
        <div>
            <form>
                <div className="row">
                    <div className="col">
                        <input type="text" value={course.title} className="form-control" placeholder="Titre" />
                    </div>
                    <div className="col">
                        <input type="number" value={course.lessons} className="form-control" placeholder="Nombre de leçcons" />
                    </div>
                </div><br />
                <div className="row">
                    <div className="col">
                        <input type="number" value={course.duration} className="form-control" placeholder="Durée par jour" />
                    </div>
                    <div className="col">
                        <select class="form-control">
                            <option value="">{teacherCourse.fullname}</option>
                            {
                                teachers.map((teacher) => (
                                    <option>{teacher.id}</option>
                                ))
                            }

                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCourse
