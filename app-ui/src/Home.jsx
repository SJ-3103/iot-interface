import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/Navbar";
import MyChart from "./components/MyChart";
import Table from "./components/Table";
import LiveChart from "./components/LiveChart";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

import "./res/home.css";
import "./res/helper.css";

export default function Home() {
  const [plantData, setPlantData] = useState({});

  const [isShowChart, setShowCharts] = useState(true);
  const [isShowTable, setShowTable] = useState(false);

  const [isNewChart, setNewChart] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
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
  }, []);

  // feature to send emails
  const sendMail = async () => {
    const last_field = plantData[Object.keys(plantData).length - 1];
    const date = last_field.date;
    const temperature = last_field.temperature;
    const humidity = last_field.humidity;
    const moisture = last_field.moisture;
    const lightval = last_field.lightval;

    let value = confirm(
      "Do you wish to send e-mail to admin?\nDate & Time: " +
        date +
        "\nTemperature: " +
        temperature +
        " C\nHumidity: " +
        humidity +
        " %\nMoisture: " +
        moisture +
        " %\nLight Intensity: " +
        lightval +
        " lumens"
    );

    if (value) {
      const res = await fetch("/post/emails/", { method: "POST" }).then((res) =>
        res.json()
      );
      console.log(res);
      alert("E-mail has been sent to the admin gmail account.");
    }
  };

  function showRealTimeData() {
    setNewChart(true);
    setShowCharts(false);
    setShowTable(false);
  }

  function showCharts() {
    setShowCharts(true);
    setShowTable(false);
    setNewChart(false);
  }

  function showTable() {
    setShowTable(true);
    setShowCharts(false);
    setNewChart(false);
  }

  function choiceFunction() {
    if (isNewChart == false) {
      if (isShowChart) {
        return <MyChart data={plantData} />;
      } else if (isShowTable) {
        return <Table data={plantData} />;
      }
    } else {
      return <LiveChart />;
    }
  }

  function handleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <div className="App">
      <Navbar />

      <div className="main-wrapper">
        <SideBar />

        <div className="main">
          {Object.keys(plantData).length > 0 ? (
            <div>
              <div className="dropdown-content">
                {showMenu ? (
                  <div className="dropdown-menu">
                    <button onClick={showCharts}>Show Charts</button>
                    <button onClick={showTable}>Show Table</button>
                    <button onClick={showRealTimeData} id="plant-button">
                      Real Time Data
                    </button>
                    <button onClick={sendMail}>Send Email</button>
                  </div>
                ) : (
                  <></>
                )}
                {showMenu ? (
                  <FontAwesomeIcon icon={faXmark} onClick={handleMenu} />
                ) : (
                  <FontAwesomeIcon icon={faBars} onClick={handleMenu} />
                )}
              </div>

              <div className="data">{choiceFunction()}</div>

              <Footer />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
