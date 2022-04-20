import { useState, useEffect } from "react"
import "./res/home.css"

import Navbar from "./components/Navbar"
import MyChart from './components/MyChart'
import Table from './components/Table'


export default function Home(){

    const [plantData,setPlantData] = useState([])
  
    useEffect(() => {
      async function fetchData(){
        const response_data = await fetch("http://localhost:8000/").then(res => res.json())
        setPlantData(response_data.data)
      }
    
      fetchData()
    },[])
  
    function send_mail(){
        console.log("Button is clicked")
    }

    return(
      <div className="App">
        <Navbar/>
  
        <div className="data">
            <MyChart data={plantData}/>
            <Table data={plantData}/>
        </div>
        
        <div className="button-wrapper">
          <button onClick={send_mail}>Send Mail</button>
        </div>

      </div>
    )
}