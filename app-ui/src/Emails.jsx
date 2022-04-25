import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import Navbar from "./components/Navbar"
import "./res/email.css"


export default function Emails() {

    const [emails,setEmails] = useState([])

    useEffect(() => {
        async function fetchEmails() {
            const emails = await fetch("http://localhost:8000/emails/").then(res => res.json())
            setEmails(emails.data)
        }

        fetchEmails()

    },[])

    return (
        <>
        <Navbar/>
            {emails.map((data)=>{
            return(
                <Link to="/" className="main-wrapper">
                <div className="row-wrapper">
                    <div className='div1'>
                    <p>From:</p>
                    <p>{data.sender}</p>
                    </div>

                    <div className='div2'>
                    <p>To:</p>
                    <p>{data.reciever}</p>
                    </div>
                
                    <div className='div3'>
                    <p>Subject:</p>
                    <p>{data.subject}</p>
                    </div>

                    <div className='div4'>
                    <p>Context:</p>
                    <p>{data.context}</p>
                    </div>
                </div> 
                </Link>
            )
            })}
        </>
    )
}