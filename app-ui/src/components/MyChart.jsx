import { useEffect, useState } from "react";
import "../res/chart.css";

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
  "temperature_options": {
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
          text: "Date"
        }
      },
      yAxes: {
        title: {
          display: true,
          text: "Temperature in C"
        }
      }
    }
  },

  "humidity_options": {
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
      xAxes :{
        title: {
          display: true,
          text: "Date"
        }
      },
      yAxes: {
        title: {
          display: true,
          text: "Humidity in %"
        }
      }
    }
  },

  "light_options": {
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
      xAxes :{
        title: {
          display: true,
          text: "Date"
        }
      },
      yAxes: {
        title: {
          display: true,
          text: "Resistance in ohms"
        }
      }
    }
  },

  "soil_options": {
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
      xAxes :{
        title: {
          display: true,
          text: "Date"
        }
      },
      yAxes: {
        title: {
          display: true,
          text: "These values has to be converted back"
        }
      }
    }
  }

}


export default function MyChart(props) {
  const [tempData, setTempData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        borderColor: "",
        backgroundColor: "",
        data: []
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

  useEffect(() => {
    setTempData({
      labels: Object.keys(props.data).map( (val,index)=> props.data[val]["date"]),
    });

    setHumidityData({
      labels: Object.keys(props.data).map( (val,index)=> props.data[val]["date"]),
    })

    setLightData({
      labels: Object.keys(props.data).map( (val,index)=> props.data[val]["date"]),
    })

    setSoilMoistureData({
      labels: Object.keys(props.data).map( (val,index)=> props.data[val]["date"]),
    })

    setTempData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Temperature",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            data: Object.keys(props.data).map( (val,index)=> props.data[val]["temperature"]),
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
            data: Object.keys(props.data).map( (val,index)=> props.data[val]["humidity"])
          },
        ],
      };
    })

    setLightData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Light Intensity",
            borderColor: "rgb(53, 162, 100)",
            backgroundColor: "rgba(53, 162, 100, 0.5)",
            data: Object.keys(props.data).map( (val,index)=> props.data[val]["lightval"])
          },
        ],
      };
    })

    setSoilMoistureData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Soil Moisture",
            borderColor: "rgb(153, 62, 35)",
            backgroundColor: "rgba(153, 62, 35, 0.5)",
            data: Object.keys(props.data).map( (val,index)=> props.data[val]["moisture"])
          },
        ],
      };
    })
  }, []);

  return (
    <div className="chart">
      <h3>Line Chart of Different Parameters</h3>
      
      <div className="myclass">

        <div>
          <Line options={options.temperature_options} data={tempData} />
        </div>
        
        <div>
          <Line options={options.humidity_options} data={humidityData} />
        </div>
        
        <div>
          <Line options={options.light_options} data={lightData} />
        </div>
        
        <div>
          <Line options={options.soil_options} data={soilMoistureData} />
        </div>
      
      </div>
    </div>
  );
}
