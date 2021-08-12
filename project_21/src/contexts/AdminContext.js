import React, { useContext, useState, useEffect } from "react"
import { auth, db } from '../firebase'

const AdminContext = React.createContext()

export function adminStorage() {
  return useContext(AdminContext)
}

export const  AdminProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

const addAdmin = (fullname, email) => {
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

const updateAdminData = (id, fullname, email, image) => {
  return db.collection('users').doc(id).update({
    fullname:fullname,
    email:email,
    image:image,
    archived:false
  })
}

const getAdminData = async (id) =>{
  const response = await db.collection('users').doc(id).get();
  const AdminData = response.data();
  return AdminData;
}

const archiveAdmin = (id) => {
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
    addAdmin,
    getAdminData,
    updateAdminData,
    archiveAdmin
  }

  return (
    <AdminContext.Provider value={value}>
      {!loading && children}
    </AdminContext.Provider>
  )
}