import { useEffect, useState, useMemo } from "react"
import "../res/chart.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Line Chart',
      }
    }
}


export default function MyChart(props) {    

    const [chartData,setChartData] = useState({ 
        labels: [], 
        datasets: [
            {
                label: "",
                borderColor: "",
                backgroundColor: "",   
                data: []
            }
        ]
    })
    
    useEffect(() => {

        const myfunction = () => {

            setChartData({
                labels: props.data.map((val) => val["date"])
            })

            setChartData((prevState) => {
                return ({
                    ...prevState,
                    datasets: [
                        {
                            label: 'Temperature',
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            data: props.data.map((val) => val["temperature"])
                        },
                        {
                            label: 'Humidity',
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            data: props.data.map((val) => val["humidity"])
                        },
                        {
                            label: 'Light Intensity',
                            borderColor: 'rgb(53, 162, 100)',
                            backgroundColor: 'rgba(53, 162, 100, 0.5)',
                            data: props.data.map((val) => val["lightval"])
                        },
                        {  
                            label: 'Moisture Value',
                            borderColor: 'rgb(153, 62, 35)',
                            backgroundColor: 'rgba(153, 62, 35, 0.5)',
                            data: props.data.map((val) => val["moisture"])
                        }
                    ]
                })
            })
        
        }
        myfunction()  
    },[])


    return (
        <div className="chart">
            <h3>Line Chart of Different Parameters</h3>

            <Line options={options} data={chartData}/>
        </div>
    )
}