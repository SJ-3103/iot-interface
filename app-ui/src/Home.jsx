import { useState, useEffect } from "react";
import "./res/home.css";

import Navbar from "./components/Navbar";
import MyChart from "./components/MyChart";
import Table from "./components/Table";

export default function Home() {
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response_data = await fetch("http://localhost:8000/home").then(
        (res) => res.json()
      );
      return response_data;
    };
    // handle promise properly while using async-await
    fetchData()
      .then((response) => {
        console.log(response);
        setPlantData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sendMail = () => {
    console.log("Button is clicked!");
  };

  return (
    <div className="App">
      <Navbar />
      {/* only load the components when data is retrieved from the api */}
      {plantData.length > 0 ? (
        <div className="data">
          <MyChart data={plantData} />
          <Table data={plantData} />
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <div className="button-wrapper">
        <button onClick={sendMail}>Send Mail</button>
      </div>
    </div>
  );
}
