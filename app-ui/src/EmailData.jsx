import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import './res/emaildetail.css'


export default function EmailData() {
    
    const location = useLocation()

    return (
        <div>
            <Navbar/>
            <div className="main-wrapper">
                <SideBar/>
                <div className="main emaildata-wrapper">
                    <p>
                        <b>From:</b>
                        <span>{location.state.sender}</span>
                    </p>
                    
                    <p>
                        <b>To:</b>
                        <span>{location.state.reciever}</span>
                    </p>
                    
                    <p>
                        <b>Subject:</b>
                        <span>{location.state.subject}</span>
                    </p>
                    
                    <p>
                        <b>Email Text:</b>
                        <span>{location.state.email_text}</span>
                    </p>
                    
                    <p>
                        <b>Email Attachment:</b> 
                        <span>{location.state.email_attachment}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}