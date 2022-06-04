import { useState, useEffect } from "react";
import "../res/table.css";

export default function Table(props) {
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    setTableData(props.data);
  });

  return (
    <div className="table">
      <h3>Table of Different Parameters</h3>
      <table className="table-data">
        <thead>
          <tr className="table-headings column-blue">
            <th>Date</th>
            <th>Temperature (in C)</th>
            <th>Humidity (in %)</th>
            <th>Light Intensity (in Lumens)</th>
            <th>Moisture (in %)</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(tableData)
            .map((val, index) => {
              if (index % 2 == 0) {
                return <ColumnWhite data={tableData[val]} key={index} />;
              } else {
                return <ColumnBlue data={tableData[val]} key={index} />;
              }
            })
            .reverse()}
        </tbody>
      </table>
    </div>
  );
}

function ColumnWhite(props) {
  return (
    <tr className="column-white">
      <td>{props.data["date"]}</td>
      <td>{props.data["temperature"]}</td>
      <td>{props.data["humidity"]}</td>
      <td>{props.data["lightval"]}</td>
      <td>{props.data["moisture"]}</td>
    </tr>
  );
}

function ColumnBlue(props) {
  return (
    <tr className="column-blue">
      <td>{props.data["date"]}</td>
      <td>{props.data["temperature"]}</td>
      <td>{props.data["humidity"]}</td>
      <td>{props.data["lightval"]}</td>
      <td>{props.data["moisture"]}</td>
    </tr>
  );
}
