import React, { useContext, useState, useEffect } from "react"
import { auth, db } from '../firebase'

const CourseContext = React.createContext()

export function courseStorage() {
  return useContext(CourseContext)
}

export function CourseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

const addCourse = (title, lessons, duration, startAt, addedAt, teacher, status) => {
    db.collection('courses').add({
        title:title,
        image:'',
        lessons:lessons,
        duration:duration,
        startAt:startAt,
        addedAt:addedAt,
        teacher:teacher,
        status:status
    })
}

const archiveCoure = (id) => {
    db.collection('courses').doc(id).update({
        status:"archived"
    })
}

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
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
    addCourse,
  }

  return (
    <CourseContext.Provider value={value}>
      {!loading && children}
    </CourseContext.Provider>
  )
}