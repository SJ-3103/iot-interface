// import faker from 'faker';
import { useState, useEffect, useRef } from 'react';

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
  
  const myRef = useRef(null)
  
  const [testData, setTestData] = useState([9,68,29,22,20])

  useEffect(() => {

    setLiveData({
        labels: testData.map((val,index) => index)
    });

    setLiveData((prevState) => {
      return {
        ...prevState,
        datasets: [
          {
            label: "Dataset 1",
            borderColor: "rgb(53, 162, 100)",
            backgroundColor: "rgba(53, 162, 100, 0.5)",
            data: testData
          }
        ]
      }
    });

  },[])

  function getData(){    
    setTestData([5,78,20,29])
  }


  return (
    <>
      <Line options={options} data={chartData} ref={myRef} />
      <button onClick={getData}>Get Data</button>
      {console.log(testData)}
    </>
  );
}