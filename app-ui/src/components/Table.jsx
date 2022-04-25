import { useState , useEffect} from "react"
import "../res/table.css"


export default function Table(props) {

    const [tableData,setTableData] = useState([])
    
    useEffect(() => {
        setTableData(props.data)   
    })

    return (
        <div className="table">
            <h3>Table of Different Parameters</h3>
            <table className="table-data">
                
                <thead>
                    <tr className="table-headings column-blue">
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>Light Value</th>
                        <th>Moisture Value</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((value,index)=>{
                        if(index%2 == 0){
                            return (
                                <ColumnWhite data={value} key={index}/>
                            )
                        }
                        else{
                            return (
                                <ColumnBlue data={value} key={index}/>
                            )
                        }
                    })}
                </tbody>

            </table>
        </div>
    )
}

function ColumnWhite(props){
    return(
        <tr className="column-white">
            <td>{props.data["date"]}</td>
            <td>{props.data["temperature"]}</td>
            <td>{props.data["humidity"]}</td>
            <td>{props.data["lightval"]}</td>
            <td>{props.data["moisture"]}</td>
        </tr>
    )
}

function ColumnBlue(props){
    return(
        <tr className="column-blue">
            <td>{props.data["date"]}</td>
            <td>{props.data["temperature"]}</td>
            <td>{props.data["humidity"]}</td>
            <td>{props.data["lightval"]}</td>
            <td>{props.data["moisture"]}</td>
        </tr>
    )
}