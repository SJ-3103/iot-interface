import { useState } from "react"
import { Link } from "react-router-dom"
import "../res/navbar.css"

export default function Navbar(props) {
    const [number,setNumber] = useState()

    return(
      <header className='header'>
        <nav>
          <Link to='/'>
            <ul>
              <div id="nav-image"></div>
              <h3>Growth Monitoring of Plants using Raspberry Pi and IoT</h3>
            </ul>
          </Link>
          
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/images">Images</Link></li>
            <li id="mail-box">
              <Link to="/emails">E-Mails 
                {number ? (<span>{number}</span>) : (console.log("Nothing")) }
              </Link>
            </li>
          </ul>
        </nav>
  
      </header>
    )
}