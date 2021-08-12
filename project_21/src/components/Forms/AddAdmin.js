import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../Controls/Controls";
import { useForm, Form } from '../useForm';
import { useHistory } from 'react-router-dom';
import { auth, db } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const genderItems = [
    { id: 'M.', title: 'M.' },
    { id: 'Mme', title: 'Mme' },
    { id: 'Mlle', title: 'Mlle' },
]

const status = [
    { id: 1, title: 'Admin'},
    { id: 2, title: 'Campus 2'},
    { id: 3, title: 'Campus 3'},
    { id: 4, title: 'Campus 4'},
    { id: 5, title: 'Campus 5'},
    { id: 6, title: 'Siège'},
]

const initialFValues = {
    id: 0,
    fullname: '',
    email: '',
    mobile: '',
    adress: '',
    gender: 'M.',
}

const AdminForm = (props) => {
    const { addOrEdit, recordForEdit } = props
    const [error, setError] = useState('')
    //const {addTeacher} = TeacherStorage()
    const history = useHistory()
    const password = "bakeli2021"

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullname' in fieldValues)
            temp.fullname = fieldValues.fullname ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('profil' in fieldValues)
            temp.profil = fieldValues.profil.length != 0 ? "" : "This field is required."
        if ('adress' in fieldValues)
            temp.adress = fieldValues.adress ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await auth.createUserWithEmailAndPassword(values.email, password).then(cred => {
                return db.collection('users').doc(cred.user.uid).set({
                  user_id: cred.user.uid,
                  fullname: values.fullname,
                  email: values.email,
                  image: '',
                  status: 'admin',
                  archived: false,
                  civility: values.gender
                })
              })
              toast.success('Admin Ajouté avec succés')
        } catch (error) {
            setError("Failed to add a teacher")
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullname"
                        label="Prénom et Nom"
                        value={values.fullname}
                        onChange={handleInputChange}
                        error={errors.fullname}
                    />
                    <Controls.Input
                        label="Adresse"
                        name="adress"
                        value={values.adress}
                        onChange={handleInputChange}
                        error={errors.adress}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Téléphone"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />    
                </Grid>
                <Grid item xs={12}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Genre"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />  
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Ajouter" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div> 
                    <ToastContainer />
                </Grid>
            </Grid>
        </Form>
    )
}

export default AdminForm;