import React, { useState, useEffect } from 'react'
import { MenuBook, SupervisorAccount, School } from "@material-ui/icons";
import AddAdminContainer from '../../components/Dialog/AddAdminContainer'
import AddTeacherContainer from '../../components/Dialog/AddTeacherContainer'
import AddStudentContainer from '../../components/Dialog/AddStudentContainer'
import AddCourseContainer from '../../components/Dialog/AddCourseContainer'
import AddAdminForm from '../../components/Forms/AddAdmin'
import AddCourseForm from '../../components/Forms/AddCourse'
import AddStudentForm from '../../components/Forms/AddStudent'
import AddTeacherForm from '../../components/Forms/AddTeacher'
import {db} from '../../firebase'




const ActionButtons = () => {
    const [openAddAdminContainer, setOpenAddAdminContainer] = useState(false);
    const [openAddCourseContainer, setOpenAddCourseContainer] = useState(false);
    const [openAddTeacherContainer, setOpenAddTeacherContainer] = useState(false);
    const [openAddStudentContainer, setOpenAddStudentContainer] = useState(false);
    const [coursesDetails, setCoursesDetails] = useState([])


    useEffect(() => {
        const courses = []
    
        return () => {
            db.collection('courses')
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const courseId = doc.id
                    const courseData = doc.data()
                    const courseObj = { data:courseData, ['id']: courseId }
    
                    //courses.push(courseObj)
                    courses.push(courseData)
                })
                
               })
               .catch(error=> console.log(error));
    
    
            setCoursesDetails(courses)
        }
    }, [])

    return (
        <>
            <div className="header">
                <h4>Veuillez cliquer sur l'un des boutons suivants pour ajouter nouvel élément</h4>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
                <div className="col-md-6 buttons">
                    <button
                        className="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm"
                        type="button"
                        aria-expanded="false"
                        onClick={() => setOpenAddAdminContainer(true)}>
                        <SupervisorAccount style={{ paddingRight: 4 }} /> <br />
                    Ajouter un <br/> nouvel admin
                </button>
                    <AddAdminContainer
                        title="Ajouter un admin"
                        openAddAdminContainer={openAddAdminContainer}
                        setOpenAddAdminContainer={setOpenAddAdminContainer}
                    >
                        <AddAdminForm />
                    </AddAdminContainer>
                </div>
                <div className="col-md-6 buttons">
                    <button
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        type="button"
                        aria-expanded="false"
                        onClick={() => setOpenAddTeacherContainer(true)}>
                        <SupervisorAccount style={{ paddingRight: 4 }} /> <br />
                    Ajouter un <br/> nouveau professeur
                </button>
                    <AddTeacherContainer
                        title="Ajouter un Professeur"
                        openAddTeacherContainer={openAddTeacherContainer}
                        setOpenAddTeacherContainer={setOpenAddTeacherContainer}
                    >
                        <AddTeacherForm />
                    </AddTeacherContainer>
                </div>
            </div><br/><br/>
            <div className="row buttons">
                <div className="col-md-6">
                    <button
                        className="d-none d-sm-inline-block btn btn-sm btn-secondary shadow-sm"
                        type="button"
                        aria-expanded="false"
                        onClick={() => setOpenAddStudentContainer(true)}>
                        <School style={{ paddingRight: 4 }} /> <br />
                    Ajouter un <br/> nouveau étudiant
                </button>
                    <AddStudentContainer
                        title="Ajouter un Etudiant"
                        openAddStudentContainer={openAddStudentContainer}
                        setOpenAddStudentContainer={setOpenAddStudentContainer}
                    >
                        <AddStudentForm />
                    </AddStudentContainer>
                </div>
                <div className="col-md-6 buttons">
                    <button
                        className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
                        type="button"
                        aria-expanded="false"
                        onClick={() => setOpenAddCourseContainer(true)}>
                        <MenuBook style={{ paddingRight: 4 }} /> <br />
                    Ajouter un <br/> nouveau cours
                </button>
                    <AddCourseContainer
                        title="Ajouter un nouveau Cours"
                        openAddCourseContainer={openAddCourseContainer}
                        setOpenAddCourseContainer={setOpenAddCourseContainer}
                    >
                        <AddCourseForm />
                    </AddCourseContainer>
                </div>
            </div>
            {
                /*coursesDetails.map((course)=>{
                    console.log(course.id);
                })*/
                console.log(coursesDetails.length)
            }
        </>
    )
}

export default ActionButtons;
