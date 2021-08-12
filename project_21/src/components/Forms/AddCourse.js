import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../Controls/Controls";
import { useForm, Form } from '../useForm';
import { useHistory } from 'react-router-dom';
import { db } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const status = [
    { id: 'ongoing', title: 'En cours' },
    { id: 'finished', title: 'Terminé' },
    { id: 'archived', title: 'Archivé' },
]


const teachers = []

db.collection('users').where("status", "==", "teacher")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            teachers.push({ id: doc.id, title: doc.data().fullname })
        })
    })

const initialFValues = {
    id: 0,
    title: '',
    lessons: '',
    duration: '',
    start: '',
    teacher: '',
    status: '',
}

const AddCourseForm = (props) => {
    const { recordForEdit } = props
    const addedAt = new Date()


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('profil' in fieldValues)
            temp.profil = fieldValues.profil.length != 0 ? "" : "This field is required."
        if ('teacher' in fieldValues)
            temp.teacher = fieldValues.teacher ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const handleSubmit = e => {
        e.preventDefault()

        try {
            db.collection('courses').add({
                title: values.title,
                image: '',
                lessons: values.lessons,
                duration: values.duration,
                startAt: values.start,
                addedAt: addedAt,
                teacher: values.teacher,
                status: values.status,
                archived: false
            })
            toast.success('Cours Ajouté avec succés')
        } catch (error) {
            console.log(error);
        }
    }


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

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
                        name="title"
                        label="Titre du cours"
                        value={values.title}
                        onChange={handleInputChange}
                        required
                        error={errors.title}
                    />
                    <Controls.InputNumber
                        label="Nombre de leçons"
                        name="lessons"
                        value={values.lessons}
                        onChange={handleInputChange}
                        required
                        error={errors.lessons}
                    />
                    <Controls.InputNumber
                        label="Durée par jour en minutes"
                        name="duration"
                        value={values.duration}
                        onChange={handleInputChange}
                        required
                        error={errors.duration}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        label="Professeur"
                        name="teacher"
                        value={values.teacher}
                        options={teachers}
                        onChange={handleInputChange}
                        required
                        error={errors.teacher}
                    />
                    <Controls.Select
                        label="Statut"
                        name="status"
                        value={values.status}
                        options={status}
                        onChange={handleInputChange}
                        required
                        error={errors.status}
                    />
                    <Controls.Datetime
                        label="Date de début"
                        value={values.start}
                        onChange={handleInputChange}
                    />
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
export default AddCourseForm;