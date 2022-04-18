import { Link,Route,Routes } from 'react-router-dom'
import './App.css'
import MyChart from './components/MyChart'
import Table from './components/Table'
import { useState } from 'react'


export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="#" element={<About />} /> */}
    </Routes>
  )
}

function Home(){

  var [number,setNumber] = useState(3)

  const send_mail = () => {
    console.log("Button is clicked")
  }

  return(
    <div className="App">
      <header className='header'>
        <nav>
          <ul>
            <li><Link to="#">Home</Link></li>
            <li><Link to="#">About</Link></li>
          </ul>
          <ul><div></div></ul>
          <ul>
            <li><Link to="#">Images</Link></li>
            <li id="mail-box"><Link to="#">E-Mails <span>{number}</span> </Link></li>
          </ul>
        </nav>

        <h2>Plant Monitoring System Using Raspberry Pi</h2>
      </header>

      <div className="data">
          <MyChart/>
          <Table />
      </div>
      
      <div className="button-wrapper">
        <button onClick={send_mail}>Send Mail</button>
      </div>
    </div>
  )
}