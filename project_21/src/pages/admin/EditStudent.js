import React from 'react'
import {db} from '../../firebase'
import Navbar from '../../components/admin/NavbarAdmin'
import EditStudentForm from './EditForms/EditStudentForm'


const EditStudent = () => {
    return (
        <div>
            <Navbar/><br/>
            <EditStudentForm/>
        </div>
    )
}

export default EditStudent
