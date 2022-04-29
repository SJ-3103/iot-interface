import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import Navbar from "./components/Navbar"
import "./res/email.css"


export default function Emails() {

    const [emails,setEmails] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response_data = await fetch("http://localhost:8000/emails/").then(res => res.json())
            return response_data
        }

        fetchData()
            .then( (res)=>{
                setEmails(res)
            }).catch( (err)=>{
                console.log(err)
            } )

    },[])

    return (
        <>
        <Navbar/>
        {
            Object.keys(emails).length > 0 ? (
                Object.keys(emails).map( (val,index)=>{
                    return <EmailBox data={emails[val]} key={index}/>
                } )
            ) : (
                <div>Loading...</div>
            )
        }
        </>
    )
}

function EmailBox(props){
    return(
        <Link to="/" className="main-wrapper">
            <div className="row-wrapper">
                <div className='div1'>
                <p>From:</p>
                <p>{props.data.sender}</p>
                </div>

                <div className='div2'>
                <p>To:</p>
                <p>{props.data.reciever}</p>
                </div>
            
                <div className='div3'>
                <p>Subject:</p>
                <p>{props.data.subject}</p>
                </div>

                <div className='div4'>
                <p>Context:</p>
                <p>{props.data.email_text}</p>
                </div>
            </div> 
        </Link>
    )
}