import { useState, useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import "../res/chart.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Real time data',
    },
  },
};


export default function LiveChart() {

  const [realTimeData, setRealTimeData] = useState({
    0:{
      "date":"20/5/22",
      "humidity":"0",
      "temperature":"0",
      "lightval":"0",
      "moisture":"0"
    }
  })

  const [chartData,setLiveData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        borderColor: "",
        backgroundColor: "",
        data: [],
      },
    ],
  });
  
  const [ws,setWebSocket] = useState({})

  useEffect(() => {

    const websocket = () => {
      const ws = new WebSocket("wss://"+window.location.host+"/ws")
      
      ws.onmessage = (event) => {
        console.log(event.data)

	let my_data = JSON.parse(event.data)

        setRealTimeData((prevState) => { return {...prevState,1:{
          "date":"20/05/22",
          "temperature":my_data["temperature"],
          "humidity":my_data["moisture"],
          "lightval":my_data["lightvalue"],
          "moisture":my_data["soil_moisture_val"]
        }}})
      
      }

      ws.onclose = (event) => {
        console.log("socket is closed from backend")
      }

      ws.onerror = (event) => {
        console.log("error in socket")
      }
      
      setWebSocket(ws)
    }
    
    websocket()
    
    setLiveData({
        labels: Object.keys(realTimeData).map((val,index)=>realTimeData[val]["date"])
    });

    setLiveData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Temperature",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            data: Object.keys(realTimeData).map((val,index)=>realTimeData[val]["temperature"])
          },
          {
            label: "Humidity",
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            data: Object.keys(realTimeData).map((val,index)=>realTimeData[val]["humidity"])
          },
          {
            label: "Soil Misture",
            borderColor: "rgb(153, 62, 35)",
            backgroundColor: "rgba(153, 62, 35, 0.5)",
            data: Object.keys(realTimeData).map((val,index)=>realTimeData[val]["moisture"])
          },
          {
            label: "Light Intensity",
            borderColor: "rgb(53, 162, 100)",
            backgroundColor: "rgba(53, 162, 100, 0.5)",
            data: Object.keys(realTimeData).map((val,index)=>realTimeData[val]["lightval"])
          }
        ]
      }
    });
    

  },[realTimeData])

  function getData() {
    
    ws.send(JSON.stringify({
      "get_data":true
    }))
    
  }


  return (
    <div className="realtime">
      <Line options={options} data={chartData} id="line" />
      <div>
        <button onClick={getData}>Get Data</button>
      </div>
      {console.log(Object.keys(realTimeData).map((val)=>realTimeData[val]["date"]))}
    </div>
  );
}
