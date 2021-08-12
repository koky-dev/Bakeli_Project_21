import React, { useState, useEffect } from 'react'
import { Search } from "@material-ui/icons"
import Teacher from "../teacher_card"
import { auth, db } from '../../firebase'
import { Link, useHistory } from 'react-router-dom'
import { Archive, Edit, DeleteForeverSharp } from "@material-ui/icons"
import EditCourse from '../Forms/EditCourse'
import EditCourseContainer from '../Dialog/EditCourseContainer'

const Main = () => {
    const [coursesDetails, setCoursesDetails] = useState([])
    const [openEditCourseContainer, setOpenEditCourseContainer] = useState(false);
    const history = useHistory()

    const deleteCourse = async (courseId) => {
        try {
            await db.collection('courses').doc(courseId).delete().then(() => {
                history.replace("/admin_home")
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    const archiveCourse = async (courseId) => {
        try {
            await db.collection('courses').doc(courseId).update({
                status: "archived"
            }).then(() => {
                history.push("/admin_home")
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        //const courses = []

        db.collection('courses')
            .get()
            .then((snapshot) => {
                const courses = snapshot.docs.map((course) => ({
                    // doc.data() is never undefined for query doc snapshots
                    id: course.id,
                    ...course.data()
                }))

                setCoursesDetails(courses)
            })
            .catch(error => console.log(error));

    }, [])

    return (
        <div className="main">
            <div className="row header">
                <div className="search_container">
                    <div className="header_searchbar col-md-10">
                        <input type="text" placeholder="What do you want to learn ?" />
                        <Search className="search_icon" />
                    </div>
                </div>
                <div className="searchbutton col-md-2">
                    <a href="" className="btn btn-outline-primary">Study now</a>
                </div>
            </div>
            <div className="courses">
                <div className="row courses_header">
                    <div className="col-md-10">
                        <h4>Popular Courses</h4>
                    </div>
                    <div className="col-md-2">
                        <span>View All</span>
                    </div>
                </div><br />
                <div className="courses_main">
                    {
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Statut</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coursesDetails.map((course) => (
                                        <tr key={course.id}>
                                            <td><strong>{course.title}</strong></td>
                                            {
                                                course.status == "ongoing" ?
                                                    <td>En cours</td>
                                                    :
                                                    course.status == "archived" ?
                                                        <td>Archivé</td>
                                                        :
                                                        <td>Terminé</td>
                                            }

                                            <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <button className="" style={{ color: 'red' }} onClick={() => deleteCourse(course.id)}><DeleteForeverSharp /></button>&nbsp;
                                        {
                                                    course.status == "archived" ?
                                                        <button className="btn btn-secondary" disabled>Archivé</button>
                                                        :

                                                        <button className="" onClick={() => archiveCourse(course.id)}><Archive /></button>
                                                }&nbsp;
                                        {
                                                    course.status == "archived" ?
                                                        null
                                                        :
                                                        <Link to={{
                                                            pathname: "/edit_course",
                                                            state:{
                                                                id: course.id,
                                                                course: course
                                                            }
                                                        }}>
                                                        <Edit/>
                                                        </Link>
                                                }
                                                <Link to={{
                                                    pathname: "/course_details",
                                                    courseProps: {
                                                        id: course.id
                                                    }
                                                }}
                                                    className="btn btn-primary">
                                                    Détails
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
            <div className="teacher">
                <Teacher />
            </div>
        </div>
    )
}

export default Main
