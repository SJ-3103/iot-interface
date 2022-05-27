import { faChartLine, faHouseUser, faInbox, faScroll } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import "../res/sidebar.css"

export default function SideBar() {
    const [number,setNumber] = useState(null)

    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/"><FontAwesomeIcon icon={faHouseUser}/>Home</Link></li>
                <li><Link to="/about"><FontAwesomeIcon icon={faScroll}/>About</Link></li>
                <li><Link to="/analysis"><FontAwesomeIcon icon={faChartLine}/>Analysis</Link></li>
                <li id="mail-box">
                    <Link to="/emails"><FontAwesomeIcon icon={faInbox}/>E-Mails 
                        {number ? (<span>{number}</span>) : (console.log("Nothing")) }
                    </Link>
                </li>
            </ul>
        </div>
    )
}
