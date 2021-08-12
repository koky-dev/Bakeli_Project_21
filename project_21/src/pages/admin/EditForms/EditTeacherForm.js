import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase'
import moment from 'moment'
import { useLocation } from 'react-router'
import { BeatLoader } from 'react-spinners'
import {useHistory} from "react-router-dom"

const EditTeacherForm = (props) => {
    const location = useLocation()
    const teacher_id = location.state.id
    const [teachers, setTeachers] = useState([])
    const [teacherTeacher, setTeacherTeacher] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const password = "bakeli2021"

    const [fullname, setFullname] = useState(location.state.teacher.fullname)
    const [email, setEmail] = useState(location.state.teacher.email)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email != location.state.teacher.email) {
            try {
                await auth.createUserWithEmailAndPassword(email, password).then(cred => {
                    return db.collection('users').doc(cred.user.uid).set({
                      user_id: cred.user.uid,
                      fullname: fullname,
                      email: email,
                      image: '',
                      status: 'teacher',
                      archived: false,
                      courses: {},
                      civility: "Mr."
                    })
                  })
                  console.log("Update Successfully");
                  history.push('/teachers')
            } catch (error) {
                console.log("Message d'erreur : " + error.message);
            }
        } else {
            try {
                await db.collection("users").doc(teacher_id).update({
                    fullname: fullname,
                    email: email
                })
                    .then(() => {
                        console.log("Successfully Update!");
                        history.push('/teachers')
                    })
            } catch (error) {
                console.log("Message d'erreur : " + error.message);
            }
        }
    }

    const getTeacher = async () => {
        setLoading(true)
        await  db.collection('users').doc(teacher_id)
        .get()
        .then((teacherTeacher) => {
            if (teacherTeacher.exists) {
                const teacherQuery = {
                    id: teacherTeacher.id,
                    ...teacherTeacher.data()
                }
                setTeacherTeacher(teacherQuery)
                setLoading(false)
            } else {
                //setNoData(true)
            }
        })

    }

    useEffect(() => {
         getTeacher()
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
                                        value={fullname}
                                        className="form-control"
                                        onChange={(e) => setFullname(e.target.value)}
                                        placeholder="Titre" />
                                </div>
                                <div className="col">
                                    <input type="text"
                                        value={email}
                                        className="form-control"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Nombre de leçons" />
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

export default EditTeacherForm
