import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase'
import moment from 'moment'
import { useLocation } from 'react-router'
import { BeatLoader } from 'react-spinners'
import {useHistory} from "react-router-dom"

const EditStudentForm = (props) => {
    const location = useLocation()
    const student_id = location.state.id
    const [student, setStudent] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const password = "bakeli2021"

    const [fullname, setFullname] = useState(location.state.student.fullname)
    const [email, setEmail] = useState(location.state.student.email)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email != location.state.student.email) {
            try {
                await auth.createUserWithEmailAndPassword(email, password).then(cred => {
                    return db.collection('users').doc(cred.user.uid).set({
                      user_id: cred.user.uid,
                      fullname: fullname,
                      email: email,
                      image: '',
                      status: 'student',
                      archived: false,
                      courses: {},
                      civility: "Mr."
                    })
                  })
                  console.log("Update Successfully");
                  history.push('/students')
            } catch (error) {
                console.log("Message d'erreur : " + error.message);
            }
        } else {
            try {
                await db.collection("users").doc(student_id).update({
                    fullname: fullname,
                    email: email
                })
                    .then(() => {
                        console.log("Successfully Update!");
                        history.push('/students')
                    })
            } catch (error) {
                console.log("Message d'erreur : " + error.message);
            }
        }
    }

    const getStudent = async () => {
        setLoading(true)
        await  db.collection('users').doc(student_id)
        .get()
        .then((StudentStudent) => {
            if (StudentStudent.exists) {
                const StudentQuery = {
                    id: StudentStudent.id,
                    ...StudentStudent.data()
                }
                setStudent(StudentQuery)
                setLoading(false)
            } else {
                //setNoData(true)
            }
        })

    }

    useEffect(() => {
         getStudent()
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

export default EditStudentForm
