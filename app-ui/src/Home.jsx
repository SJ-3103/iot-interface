import { useState, useEffect } from "react";
import "./res/home.css";

import Navbar from "./components/Navbar";
import MyChart from "./components/MyChart";
import Table from "./components/Table";


export default function Home() {
  const [plantData, setPlantData] = useState({});

  const [ws,setWebSocket] = useState({})

  const [isShowChart,setShowCharts] = useState(true)
  const [isShowTable,setShowTable] = useState(false)

  useEffect(() => {

    const websocket = () => {
      const ws = new WebSocket("ws://"+window.location.host+"/ws")
      
      ws.onmessage = (event) => {
        console.log(event.data)
      }
  
      ws.onclose = (event) => {
        console.log("socket is closed from backend")
      }
  
      ws.onerror = (event) => {
        console.log("error in socket")
      }
      
      setWebSocket(ws)
    }

    const fetchData = async () => {
      const response_data = await fetch("/plant/").then((res) => res.json());
      return response_data;
    };

    // handle promise properly while using async-await
    fetchData()
      .then((response) => {
        // console.log(response);
        setPlantData(response);
      })
      .catch((error) => {
        console.log(error);
      });

    websocket()

  }, []);

  const sendMail = () => {
    console.log("Button is clicked!");
  };

  const getPlantData = () =>{
    console.log("Getting plant data...")
    
    // console.log(ws)

    ws.send(JSON.stringify({
      "get_data":true
    }))
    
  }

  function showCharts(){
    setShowCharts(true)
    setShowTable(false)
  }

  function showTable(){
    setShowTable(true)
    setShowCharts(false)
  }

  function choiceFunction(){
    if(isShowChart){
      return(<MyChart data={plantData}/>)
    }
    else if(isShowTable){
      return(<Table data={plantData}/>)
    }
  }

  return (
    <div className="App">
      <Navbar />
      {/* only load the components when data is retrieved from the api */}
      {Object.keys(plantData).length > 0 ? (
        <>
          <div className="choice-btns">
            <div>
              <button onClick={showCharts}>Show Charts</button>
              <button onClick={showTable}>Show Table</button>
            </div>
            <div>
              <button onClick={sendMail}>Send Mail</button>
              <button onClick={getPlantData} id="plant-button">Get Plant Data</button>
            </div>
          </div>
          {/* <div className="button-wrapper">
          </div> */}
          <div className="data">
            {choiceFunction()}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}

    </div>
  );
}
