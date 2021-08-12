import React from 'react'
import {db} from '../../firebase'
import Navbar from '../../components/admin/NavbarAdmin'
import EditForm from './EditForms/EditCourseForm'

const EditCourse = () => {
    return (
        <div>
            <Navbar/>
            <EditForm/>
        </div>
    )
}

export default EditCourse
