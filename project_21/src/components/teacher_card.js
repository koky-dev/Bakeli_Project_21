import React from 'react'
import { Star } from "@material-ui/icons";

const teacher_card = () => {
    return (
        <div className="row teacher_details">
            <div className="col-md-4 teacher_img">
                <img src="https://www.bakeli.tech/wp-content/uploads/2020/02/Logo-bakeli.png" alt="" />
            </div>
            <div className="col-md-8 teacher_name">
                <h5>Max Pinto</h5>
                <p>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                </p>
            </div>
        </div>
    )
}

export default teacher_card
