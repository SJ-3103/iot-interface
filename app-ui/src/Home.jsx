import { useState, useEffect } from "react"
import "./res/home.css"

import Navbar from "./components/Navbar"
import MyChart from './components/MyChart'
import Table from './components/Table'


export default function Home(){

    const [plantData,setPlantData] = useState([])
  
    useEffect(() => {
      
      const fetchData = async () => {
        const response_data = await fetch("http://localhost:8000/home").then(res => res.json())
        const data = await response_data.data
        setPlantData(data)
      }
    
      fetchData()
    },[])
  
    const sendMail = () => {
      console.log("Button is clicked!")
    }

    return(
      <div className="App">
        <Navbar/>

        <div className="data">
            <MyChart data={plantData}/>
            <Table data={plantData}/>
        </div>
        
        <div className="button-wrapper">
          <button onClick={sendMail}>Send Mail</button>
        </div>

      </div>
    )
}