import React from 'react'

const aboutcard = ({text, number, color}) => {
    return (
        <div className="about_card" style={{background:color}}>
            <p>{text}</p>
            <h2>{number}</h2>
        </div>
    )
}

export default aboutcard
