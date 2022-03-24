import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


interface BarProps{
  successData : Array<any> | undefined,
  failureData : Array<any> | undefined,
  dates : Array<any> | undefined
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export default function BodyCard({successData,failureData,dates}:BarProps) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Statistics',
      },
    },
  };

  const data = {
    labels : dates,
    datasets: [
      {
        label: 'Successful',
        data: successData,
        backgroundColor:'#0284c7'
      },
      {
        label: 'Failed',
        data: failureData,
        backgroundColor:'#ef4444',
      },
    ],
  };

  return(
    <>
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-auto">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Realtime App Performance
              </h6>
              <h2 className="text-gray-700 text-xl font-semibold">
                Total transactions
                <div className='text-xs font-thin'>click and unclick on either tile to load chart</div>
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-96">
            <Bar 
              options={options} 
              width = {400}
              height = {280}
              data={data}
          />
          </div>
        </div>
      </div>
    </>
  )
}
