import React from 'react'
import Calendar from '../calendar/calendar'
import Teacher from '../teacher_card'
import AboutCard from '../aboutcard'

const right = () => {
    const color = "#dedffe";
    const number = 25
    const text ="Completed courses"
    return (
        <div>
            <div>
            <Calendar/>
            </div>
            <div className="">
                <Teacher/>
            </div>
            <div className="row">
                <h3>About Teacher</h3>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <AboutCard color="#dedffe" number={number} text={text} />
                </div>
                <div className="col-md-6">
                    <AboutCard color="#ffe8f2" number="12" text="Online Webinar" />
                </div>
            </div><br/>
            <div className="row">
                <div className="col-md-6">
                    <AboutCard color="#ffe3d5" number="15" text="Teacher Reviews" />
                </div>
                <div className="col-md-6">
                    <AboutCard color="#e7fbfc" number="18" text="Courses in progress" />
                </div>
            </div>
        </div>
    )
}

export default right
