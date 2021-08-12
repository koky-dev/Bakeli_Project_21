import React, { useContext, useState, useEffect } from "react"
import { auth, db } from '../firebase'

const TeacherContext = React.createContext()

export function TeacherStorage() {
  return useContext(TeacherContext)
}

export const  TeacherProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const password = "bakeli2021"

const addTeacher = (fullname, email) => {
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      user_id: cred.user.uid,
      fullname: fullname,
      email: email,
      image: '',
      status: 'teacher',
      archived: false,
      courses: {}
    })
  })
}

const updateTeacherData = (id, fullname, email, image, status) => {
  return db.collection('users').doc(id).update({
    fullname:fullname,
    email:email,
    image:image,
    archived:false
  })
}

const getTeacherData = async (id) =>{
  const response = await db.collection('users').doc(id).get();
  const TeacherData = response.data();
  return TeacherData;
}

const archiveTeacher = (id) => {
    db.collection('users').doc(id).update({
        archived:true
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
    addTeacher,
    getTeacherData,
    updateTeacherData,
    archiveTeacher
  }

  return (
    <TeacherContext.Provider value={value}>
      {!loading && children}
    </TeacherContext.Provider>
  )
}