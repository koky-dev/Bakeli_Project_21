import React from 'react'
import Calendar from '../../components/calendar/calendar'
import Sidebar from "../../components/sidebar";
import ActionsButtons from "./actionButtons";

const Actions = () => {
    return (
        <div className="row">
            <div className="col-md-1">
                <Sidebar />
            </div>
            <div className="col-md-7 main2">
                <ActionsButtons />
            </div>
            <div className="col-md-4">
                <Calendar/>
            </div>
        </div>
    )
}

export default Actions
