import { React } from 'react';
import SidebarAdmin from './components/admin/SidebarAdmin';
import NavbarAdmin from './components/admin/NavbarAdmin';
import Footer from './components/Footer';
import Content from './components/admin/Container';
import './App.css';
import * as FaIcons from 'react-icons/fa';


function Dashboard() {

    return (
        <div className="Dashbord">
            <div id="wrapper">
                <SidebarAdmin />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <NavbarAdmin />
                        <div className="container-fluid">
                            <Content />
                        </div>
                    </div>
                        <Footer />
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up">
                    <FaIcons.FaAngleUp />
                </i>
            </a>
        </div>
    );
}


export default Dashboard;