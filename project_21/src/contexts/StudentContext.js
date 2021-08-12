import React, { useContext, useState, useEffect } from "react"
import { auth, db } from '../firebase'

const StudentContext = React.createContext()

export function studentStorage() {
  return useContext(StudentContext)
}

export function StudentProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const addStudent = (fullname, email) => {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        user_id: cred.user.uid,
        fullname: fullname,
        email: email,
        image: '',
        status: 'student',
        archived: false,
        courses: {}
      })
    })
  }

  const updateStudentData = (id, fullname, email, image, status) => {
    return db.collection('users').doc(id).update({
      fullname: fullname,
      email: email,
      image: image,
      archived: false
    })
  }

  const getStudentData = async (id) => {
    const response = await db.collection('users').doc(id).get();
    const studentData = response.data();
    return studentData;
  }

  const archiveStudent = (id) => {
    db.collection('users').doc(id).update({
      archived: true
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    addStudent,
    getStudentData,
    updateStudentData,
    archiveStudent
  }

  return (
    <StudentContext.Provider value={value}>
      {!loading && children}
    </StudentContext.Provider>
  )
}