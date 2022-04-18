import { useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend ,Label} from 'recharts'


export default function MyChart(){
    
    const [ chartData, setChartData ] = useState([])

    useEffect(() => {
        setChartData([
            {name: 'Page A', x: 400, y: 2400},
            {name: 'Page B', x: 600, y: 2600},
            {name: 'Page C', x: 800, y: 2800},
            {name: 'Page D', x: 1000, y: 3000},
            {name: 'Page E', x: 1000, y: 3000},
            {name: 'Page F', x: 1000, y: 3000},
            {name: 'Page G', x: 1000, y: 3000},
            {name: 'Page H', x: 1000, y: 3000},
            {name: 'Page I', x: 1000, y: 3000},
            {name: 'Page J', x: 1000, y: 3000},
            {name: 'Page K', x: 1000, y: 3000},
            {name: 'Page L', x: 1000, y: 3000},
            {name: 'Page M', x: 1000, y: 3000}
        ])
    },[])

    return (
        <div className="chart">
            <h2>Line Chart of Different Parameters</h2>

            <LineChart width={400} height={400} data={chartData}
                margin={{ top: 30, right: 10, left: 10, bottom: 10 }}>
                
                <Line type="monotoneX" dataKey="y" stroke="red" />
                
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                
                <XAxis dataKey="x">
                    <Label value="X Axis" offset={0} position="insideBottom" />
                </XAxis>
                
                <YAxis dataKey="y">
                    <Label value="Y Axis" angle={-90} position="insideLeft" />
                </YAxis>
                
                <Tooltip />
                
                <Legend verticalAlign="top" height={30}/>
            </LineChart>
        
        </div>
    )
}