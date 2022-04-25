import { useState } from "react"
import { Link } from "react-router-dom"
import "../res/navbar.css"

export default function Navbar() {
    const [number,setNumber] = useState(3)
  
    return(
      <header className='header'>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <ul><div></div></ul>
          <ul>
            <li><Link to="/images">Images</Link></li>
            <li id="mail-box"><Link to="/emails">E-Mails <span>{number}</span> </Link></li>
          </ul>
        </nav>
  
        <h2>Growth Monitoring of Plants using Raspberry Pi and IoT</h2>
      </header>
    )
}