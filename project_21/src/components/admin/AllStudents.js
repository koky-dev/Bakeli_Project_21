import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { BeatLoader } from 'react-spinners'
import { Link, useHistory } from 'react-router-dom'
import {Edit, DeleteForeverSharp, Archive} from '@material-ui/icons'

const AllStudents = () => {
    const [studentsDetails, setStudentsDetails] = useState([])
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const deleteStudent = async (studentId) => {
        try {
            await db.collection('users').doc(studentId).delete()
            history.replace("/students")
        } catch (error) {
            console.log(error.message);
        }
    }


    const archiveStudent = async (studentId) => {
        try {
            await db.collection('users').doc(studentId).update({
                archived: true
            })
            window.location.reload()
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        //const students = []
        setLoading(true)
        db.collection('users')
            .where("status", "==", "student")
            .get()
            .then((snapshot) => {
                const students = snapshot.docs.map((student) => ({
                    // doc.data() is never undefined for query doc snapshots
                    id: student.id,
                    ...student.data()
                }))
                setLoading(false)
                setStudentsDetails(students)
            })
            .catch(error => console.log(error));

    }, [])

    useEffect(() => {
        /*const getUser = async () => {
            //SetIsAdmin(false)
            const user = auth.currentUser
            //setCurrentUser(user)
            const userEmail = user.email
            console.log(userEmail);

            await db.collection("users")
                .where("email", "==", userEmail)
                .get().then((userData) => {
                    const snapshot = userData.docs[0]
                    //setCurrentUser(snapshot.data())

                    //currentUser.status == "admin" ? SetIsAdmin(true) : SetIsAdmin(false)
                    //console.log(currentUser)
                })
        }*/

        //getUser()
    }, [])


    return (
        <div>
            <div className="">
                {
                    loading ?
                        <div className="main">
                            <BeatLoader loading size={72} />
                        </div>
                        :
                        <div>
                        {
                            <table className="table table-lg">
                                <thead>
                                    <tr>
                                        <th scope="col">Nom Complet</th>
                                        <th scope="col">Statut</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentsDetails.map((student) => (
                                            <tr key={student.id}>
                                                <td><strong>{student.fullname}</strong></td>
                                                {
                                                    student.archived ?
                                                        <td>Archivé</td>
                                                        :
                                                        <td></td>
                                                }
    
                                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                    <button className="" style={{ color: 'red' }} onClick={() => deleteStudent(student.id)}><DeleteForeverSharp /></button>&nbsp;
                                            {
                                                        student.archived ?
                                                            <button className="btn btn-secondary" disabled>Archivé</button>
                                                            :
                                                            <button className="" onClick={() => archiveStudent(student.id)}><Archive /></button>
                                                    }&nbsp;
                                            {
                                                        student.archived ?
                                                            null
                                                            :
                                                            <Link to={{
                                                                pathname: "/edit_student",
                                                                state:{
                                                                    id: student.id,
                                                                    student: student
                                                                }
                                                            }}>
                                                            <Edit/>
                                                            </Link>
                                                    }
                                                    <Link to={{
                                                        pathname: "/student_details",
                                                        state: {
                                                            id: student.id,
                                                            student: student,
                                                            courses: student.courses.length
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
                }
            </div>
        </div>
    )
}

export default AllStudents