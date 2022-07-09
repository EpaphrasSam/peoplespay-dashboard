import React from "react";
import { Line } from "react-chartjs-2";

interface StatProps{
    succ_amount : any
    fail_amount : any
    succ_count :any
    fail_count : any
    pending_count:any
    m  : any
    v: any
    w : any
    a : any
    c : any

}
export default function MetricsChart({succ_amount,fail_amount,succ_count,fail_count,pending_count, m,v,a,c,w}:StatProps) {
  const data1 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(253, 244, 255, 1)",
        borderColor: "rgba(232, 121, 249, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [1, 3, 2, 5, 4, 5, 7],
      },
    ],
  };

  const data2 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(236, 254, 255, 1)",
        borderColor: "rgba(34, 211, 238, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [1, 5, 4, 5, 3, 6, 3],
      },
    ],
  };

  const data3 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(255, 251, 235, 1)",
        borderColor: "rgba(251, 191, 36, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [2, 5, 4, 6, 3, 5, 7],
      },
    ],
  };

  const data4 = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgba(236, 253, 245, 1)",
        borderColor: "rgba(52, 211, 153, 1)",
        tension: 0.3,
        borderWidth: 2,
        data: [1, 5, 2, 5, 3, 7, 6],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
        display: false,
        ticks: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },

        display: false,
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };

  return (
       <>
            <div className="relative p-5 pb-16 overflow-hidden shadow-md bg-white border border-gray-100">
              <div className="text-base font-segoe">Transaction Summary</div>
              <div className="relative z-10 flex items-center pt-1 space-y-1">
                <div className="text-xl font-bold text-gray-900 ">{succ_count}</div>
                <span className="font-poppins flex items-center px-2 py-0.1 mx-2 text-sm text-green-600 bg-green-100 rounded">
                  <span>successful</span>
                </span> 
              </div>
              <div className="flex space-y-1">    
                <div className="text-xl font-bold text-gray-900 ">{fail_count}</div> 
                <span className="font-poppins flex items-center px-2 py-0.1 mx-2 text-sm text-red-600 bg-red-100 rounded">
                  <span>failed</span>
                </span> 
              </div>
              <div className="flex space-y-1">    
                <div className="text-xl font-bold text-gray-900 ">{pending_count}</div> 
                <span className="font-poppins flex items-center px-2 py-0.1 mx-2 text-sm text-yellow-500 bg-yellow-50 rounded">
                  <span>pending</span>
                </span> 
              </div>
              <div className="absolute bottom-0 inset-x-0 z-0">
                <Line height={80} data={data1} options={chartOptions} />
              </div>
            </div>
            
            
            <div className="relative p-5 pb-16 overflow-hidden bg-white shadow-sm border border-gray-100">
              <div className="text-base font-segoe">Successful Amount</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold text-gray-900 ">
                  {succ_amount}
                </div>
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 24 24" 
                    fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 z-0">
                <Line height={80} data={data2} options={chartOptions} />
              </div>
            </div>
            <div className="relative p-5 pb-16 overflow-hidden bg-white shadow-sm border border-gray-100">
              <div className="text-base font-segoe ">Failed Amount</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold text-gray-900 ">{fail_amount}</div>
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" viewBox="0 0 20 20" 
                    fill="currentColor">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 z-0">
                <Line height={80} data={data3} options={chartOptions} />
              </div>
            </div>

            <div className="relative p-5 pb-16 overflow-hidden bg-white shadow-sm border border-gray-100">
              <div className="text-base font-segoe">Source Channels</div>
              <div className="relative z-10 flex items-center pt-1">
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded">
                <div className='grid grid-cols-5 divide-x- divide-green-500 text-xs pt-1 gap-2'>
                <div>
                    <span className='bg-yellow-400 rounded px-2  font-bold'>M</span>
                    <h6 className="text-xs font-semibold leading-tight py-1 pt-2">{m}</h6>
                </div>
                <div>
                <span className='bg-red-500 rounded px-2  font-bold'>V</span>
                    <h6 className="text-xs font-semibold leading-tight  py-1 pt-2">{v}</h6>
                </div>
                <div>
                <span className='bg-blue-500 rounded px-2  font-bold'>A</span>
                    <h6 className="text-xs font-semibold leading-tight  py-1 pt-2">{a}</h6>
                </div>
                <div>
                <span className='bg-green-500 rounded px-2  font-bold'>C</span>
                    <h6 className="text-xs font-semibold leading-tight  py-1 pt-2">{c}</h6>
                </div>
                <div>
                <span className='bg-pink rounded px-2  font-bold'>W</span>
                    <h6 className="text-xs font-semibold leading-tight  py-1 pt-2">{w}</h6>
                </div>
            </div>
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0  z-0">
                <Line height={80} data={data4} options={chartOptions} />
              </div>
            </div>
            
    </>
  );
}