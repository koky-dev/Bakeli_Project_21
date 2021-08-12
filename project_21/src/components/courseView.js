import React from 'react'
import { FiberManualRecordSharp } from "@material-ui/icons";

const courseView = ({ img, title, date, time, lessons }) => {
    const colors = [
        { light: "#fee7ef", dark: "#fac1d2" },
        { light: "#e7fbfc", dark: "#88dcdc" },
        { light: "#eae7f8", dark: "#9883f8" },
        { light: "#ffe3d5", dark: "#ffa873" },
        { light: "#A9EAFE", dark: "#74D0F1" },
        { light: "#FEFEE2", dark: "#FDF1B8" },
        { light: "#F5F5DC", dark: "#C8AD7F" },
        { light: "#EDEDED", dark: "#BABABA" },
        { light: "#54F98D", dark: "#16B84E" },
        { light: "#D473D4", dark: "#800080" }
    ]

    const random = Math.floor(Math.random() * colors.length);
    const randomColor = colors[random];
    return (
        <div className="oneCourse_container" style={{background: randomColor.light}}>
            <div className="row oneCourse_details">
                <div className="col-md-2 img_container" style={{background: randomColor.dark}}>
                    <img src={img ? img : "https://www.bakeli.tech/wp-content/uploads/2020/02/Logo-bakeli.png"} alt="" />
                </div>
                <div className="col-md-8 course_title">
                    <h2>{title}</h2>
                    <p>{date}</p>
                    <span>{lessons} lessons</span>
                </div>
                <div className="col-md-2 time">
                    <p className="point_icon"> <FiberManualRecordSharp className="test" />({time + "m daily"}) </p>
                </div>
            </div>
        </div>
    )
}

export default courseView
