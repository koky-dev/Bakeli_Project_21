import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import { BeatLoader } from 'react-spinners'
import { Link, useHistory } from 'react-router-dom'
import {Archive, DeleteForeverSharp, Edit} from '@material-ui/icons'

const AllTeachers = () => {
    const [teachersDetails, setTeachersDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState([])
    const [isAdmin, SetIsAdmin] = useState(true)

    const history = useHistory()

    const deleteTeacher = async (teacherId) => {
        try {
            await db.collection('users').doc(teacherId).delete()
            history.replace("/teachers")
        } catch (error) {
            console.log(error.message);
        }
    }


    const archiveTeacher = async (teacherId) => {
        try {
            await db.collection('users').doc(teacherId).update({
                archived: true
            })
            history.push("/teachers")
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        //const teachers = []
        setLoading(true)
        db.collection('users')
            .where("status", "==", "teacher")
            .get()
            .then((snapshot) => {
                const teachers = snapshot.docs.map((teacher) => ({
                    // doc.data() is never undefined for query doc snapshots
                    id: teacher.id,
                    ...teacher.data()
                }))
                setLoading(false)
                setTeachersDetails(teachers)
            })
            .catch(error => console.log(error));

    }, [])

    useEffect(() => {
        const getUser = async () => {
            SetIsAdmin(false)
            const user = auth.currentUser
            //setCurrentUser(user)
            const userEmail = user.email
            console.log(userEmail);

            const userData = await db.collection("users")
                .where("email", "==", userEmail)
                .get()
            const snapshot = userData.docs[0]
            setCurrentUser(snapshot.data())

            currentUser.status === "admin" ? SetIsAdmin(true) : SetIsAdmin(false)
            return isAdmin
        }

        getUser()
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
                                        teachersDetails.map((teacher) => (
                                            <tr key={teacher.id}>
                                                <td><strong>{teacher.fullname}</strong></td>
                                                {
                                                    teacher.archived ?
                                                        <td>Archivé</td>
                                                        :
                                                        <td></td>
                                                }
    
                                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                    <button className="" style={{ color: 'red' }} onClick={() => deleteTeacher(teacher.id)}><DeleteForeverSharp /></button>&nbsp;
                                            {
                                                        teacher.archived ?
                                                            <button className="btn btn-secondary" disabled>Archivé</button>
                                                            :
                                                            <button className="" onClick={() => archiveTeacher(teacher.id)}><Archive /></button>
                                                    }&nbsp;
                                            {
                                                        teacher.archived ?
                                                            null
                                                            :
                                                            <Link to={{
                                                                pathname: "/edit_teacher",
                                                                state:{
                                                                    id: teacher.id,
                                                                    teacher: teacher
                                                                }
                                                            }}>
                                                            <Edit/>
                                                            </Link>
                                                    }
                                                    <Link to={{
                                                        pathname: "/teacher_details",
                                                        state: {
                                                            id: teacher.id,
                                                            teacher: teacher
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

export default AllTeachers
