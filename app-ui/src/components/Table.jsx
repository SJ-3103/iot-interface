import { useState , useEffect} from "react"
import "./table.css"


export default function Table() {

    const [tableData,setTableData] = useState([])

    useEffect(() => {
      
      setTableData([
        {"DateTime":"Fri_Nov_19_07-41-17_2021","Temperature":11,"Humidity":64,"LightVal":413,"MoistureVal":88},
        {"DateTime":"Fri_Nov_19_07-42-48_2021","Temperature":11,"Humidity":64,"LightVal":114,"MoistureVal":86},
        {"DateTime":"Fri_Nov_19_07-43-19_2021","Temperature":11,"Humidity":63,"LightVal":313,"MoistureVal":86},
        {"DateTime":"Fri_Nov_19_07-51-10_2021","Temperature":11,"Humidity":62,"LightVal":119,"MoistureVal":84},
        {"DateTime":"Fri_Nov_19_07-51-41_2021","Temperature":11,"Humidity":64,"LightVal":249,"MoistureVal":82},
        {"DateTime":"Fri_Nov_19_07-56-11_2021","Temperature":11,"Humidity":64,"LightVal":0,"MoistureVal":79}
      ])
      
    }, [])
    

    return (
        <div className="table">
            <h3>Table of Different Parameters</h3>
            <table className="table-data">
                
                <thead>
                    <tr className="table-headings column-blue">
                        <th>DateTime</th>
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
            <td>{props.data["DateTime"]}</td>
            <td>{props.data["Temperature"]}</td>
            <td>{props.data["Humidity"]}</td>
            <td>{props.data["LightVal"]}</td>
            <td>{props.data["MoistureVal"]}</td>
        </tr>
    )
}

function ColumnBlue(props){
    return(
        <tr className="column-blue">
            <td>{props.data["DateTime"]}</td>
            <td>{props.data["Temperature"]}</td>
            <td>{props.data["Humidity"]}</td>
            <td>{props.data["LightVal"]}</td>
            <td>{props.data["MoistureVal"]}</td>
        </tr>
    )
}