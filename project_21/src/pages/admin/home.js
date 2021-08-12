import React from 'react'
import Sidebar from '../../components/admin/SidebarAdmin'
import Main from '../../components/admin/main'
import RightSide from '../../components/admin/right'
import Navbar from '../../components/admin/NavbarAdmin'

const home = () => {
    return (
        <div>
            <Navbar />
            <div className="row">
                <div className="col-md-12 col-lg-8 main">
                    <Main />
                </div>
                <div className="col-md-12 col-lg-4">
                    <RightSide />
                </div>

            </div>
        </div>
    )
}


export default home
