import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "../res/livechart.css";

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
  temperature_options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Line Chart of Temperature Data",
      },
    },

    scales: {
      xAxes: {
        title: {
          display: true,
          text: "Date",
        },
      },
      yAxes: {
        title: {
          display: true,
          text: "Temperature in C",
        },
      },
    },
  },

  humidity_options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Line Chart of Humidity Data",
      },
    },
    scales: {
      xAxes: {
        title: {
          display: true,
          text: "Date",
        },
      },
      yAxes: {
        title: {
          display: true,
          text: "Humidity in %",
        },
      },
    },
  },

  light_options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Line Chart of Light Intensity Data",
      },
    },
    scales: {
      xAxes: {
        title: {
          display: true,
          text: "Date",
        },
      },
      yAxes: {
        title: {
          display: true,
          text: "Light Intensity in Lumens",
        },
      },
    },
  },

  soil_options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Line Chart of Soil Moisture Data",
      },
    },
    scales: {
      xAxes: {
        title: {
          display: true,
          text: "Date",
        },
      },
      yAxes: {
        title: {
          display: true,
          text: "Soil Moisture in %",
        },
      },
    },
  },
};

export default function LiveChart() {
  const [realTimeData, setRealTimeData] = useState([
    {
      date: "0/0/00",
      humidity: "0",
      temperature: "0",
      lightval: "0",
      moisture: "0",
    },
  ]);

  // chart data states
  const [tempData, setTempData] = useState({
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

  const [humidityData, setHumidityData] = useState({
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

  const [lightData, setLightData] = useState({
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

  const [soilMoistureData, setSoilMoistureData] = useState({
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

  const [ws, setWebSocket] = useState({});

  // set analysis data
  const [temperature_msg, setTempMsg] = useState(null);
  const [humidity_msg, setHumidityMsg] = useState(null);
  const [light_msg, setLightMsg] = useState(null);
  const [soil_msg, setSoilMsg] = useState(null);
  const [motion_msg, setMotionMsg] = useState(null);

  useEffect(() => {
    // websocket function implementation
    const websocket = () => {
      const ws = new WebSocket("ws://" + window.location.host + "/ws");

      ws.onmessage = (event) => {
        console.log(event.data);

        let my_data = JSON.parse(event.data);

        // let date = "1/1/1";

        setRealTimeData((prevState) => {
          return [
            ...prevState,
            {
              date: my_data["time"],
              temperature: my_data["temperature"],
              humidity: my_data["moisture"],
              lightval: my_data["lightvalue"],
              moisture: my_data["soil_moisture_val"],
            },
          ];
        });

        setTempMsg(my_data["temperature_msg"]);
        setHumidityMsg(my_data["moisture_msg"]);
        setLightMsg(my_data["lightval_msg"]);
        setSoilMsg(my_data["soil_moisture_msg"]);
        setMotionMsg(my_data["motion_msg"]);
      };

      ws.onclose = (event) => {
        console.log("socket is closed from backend");
      };

      ws.onerror = (event) => {
        console.log("error in socket");
      };

      // set the websocket state value
      setWebSocket(ws);
    };

    websocket();

    // set value
    setTempData({
      labels: Object.keys(realTimeData).map(
        (val, index) => realTimeData[val]["date"]
      ),
    });

    setHumidityData({
      labels: Object.keys(realTimeData).map(
        (val, index) => realTimeData[val]["date"]
      ),
    });

    setLightData({
      labels: Object.keys(realTimeData).map(
        (val, index) => realTimeData[val]["date"]
      ),
    });

    // set colors and other attributes
    setSoilMoistureData({
      labels: Object.keys(realTimeData).map(
        (val, index) => realTimeData[val]["date"]
      ),
    });

    setTempData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Temperature",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            data: Object.keys(realTimeData).map(
              (val, index) => realTimeData[val]["temperature"]
            ),
          },
        ],
      };
    });

    setHumidityData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Humidity",
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            data: Object.keys(realTimeData).map(
              (val, index) => realTimeData[val]["humidity"]
            ),
          },
        ],
      };
    });

    setLightData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Light Intensity",
            borderColor: "rgb(53, 162, 100)",
            backgroundColor: "rgba(53, 162, 100, 0.5)",
            data: Object.keys(realTimeData).map(
              (val, index) => realTimeData[val]["lightval"]
            ),
          },
        ],
      };
    });

    setSoilMoistureData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Soil Moisture",
            borderColor: "rgb(153, 62, 35)",
            backgroundColor: "rgba(153, 62, 35, 0.5)",
            data: Object.keys(realTimeData).map(
              (val, index) => realTimeData[val]["moisture"]
            ),
          },
        ],
      };
    });
  }, [realTimeData]);

  function getData() {
    ws.send(
      JSON.stringify({
        get_data: true,
      })
    );
  }

  return (
    <div className="realtime">
      <h3>Real Time Line Charts</h3>

      <div className="realtime-charts-wrapper">
        <div className="realtime-charts">
          <div>
            <Line
              options={options.temperature_options}
              data={tempData}
              id="line"
            />
          </div>
          <div>
            <Line
              options={options.humidity_options}
              data={humidityData}
              id="line"
            />
          </div>
          <div>
            <Line options={options.light_options} data={lightData} id="line" />
          </div>
          <div>
            <Line
              options={options.soil_options}
              data={soilMoistureData}
              id="line"
            />
          </div>
        </div>

        <div className="realtime-btn">
          <div className="getdata-btn">
            <button onClick={getData}>Get Data</button>
          </div>
          <div className="livechart-analysis">
            {temperature_msg ? (
              <>
                <h3>Analysis:</h3>
                <ul>
                  <li>{temperature_msg}</li>
                  <li>{humidity_msg}</li>
                  <li>{light_msg}</li>
                  <li>{soil_msg}</li>
                  <li>{motion_msg}</li>
                </ul>
              </>
            ) : (
              <p>Analysis...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
