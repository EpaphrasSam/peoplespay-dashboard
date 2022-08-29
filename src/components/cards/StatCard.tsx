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
    labels: ["1", "2", "3", "4", "5", "20", "10"],
    datasets: [
      {
        fill: "origin",
        backgroundColor: "rgb(199,27,67)",
        borderColor: "rgb(199,27,67)",
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
        backgroundColor: "rgba(34, 211, 238, 1)",
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
        backgroundColor: "#49abdc",
        borderColor: "#49abdc",
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
        backgroundColor: "rgba(52, 211, 153, 1)",
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
            <div className="relative p-5  pb-5 overflow-hidden shadow-md bg-white border border-white rounded-md">
              <div className="font-semibold text-sm text-gray-600 font-segoe uppercase text-left">Transaction Summary</div>
              <div className="relative z-10 flex items-center pt-1 space-y-1">
                <div className="text-xl font-bold text-gray-800 ">{succ_count}</div>
                <span className="flex items-center px-2 py-0.1 mx-2 text-sm text-green-600 bg-green-100 rounded">
                  <span>successful</span>
                </span> 
              </div>
              <div className="flex space-y-1">    
                <div className="text-xl font-bold text-gray-800 ">{fail_count}</div> 
                <span className="flex items-center px-2 py-0.1 mx-2 text-sm text-red-600 bg-red-100 rounded">
                  <span>failed</span>
                </span> 
              </div>
              <div className="flex space-y-1">    
                <div className="text-xl font-bold text-gray-800 ">{pending_count}</div> 
                <span className="flex items-center px-2 py-0.1 mx-2 text-sm text-yellow-500 bg-yellow-50 rounded">
                  <span>pending</span>
                </span> 
              </div>
              <div className="absolute bottom-0 inset-x-0 z-0">
                <Line height={100} data={data1} options={chartOptions} />
              </div>
            </div>
            
            
            <div className="relative p-5 pb-5 overflow-hidden bg-white shadow-sm border border-gray-100 rounded-md">
              <div className="font-semibold text-sm text-gray-600 font-segoe uppercase text-left mb-3 ">Successful Amount</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold text-gray-800">
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
                <Line height={100} data={data2} options={chartOptions} />
              </div>
            </div>
            <div className="relative p-5 pb-5 overflow-hidden bg-white shadow-sm border border-gray-100 rounded-md">
              <div className="font-semibold text-sm text-gray-600 font-segoe uppercase text-left mb-3">Failed Amount</div>
              <div className="relative z-10 flex items-center pt-1">
                <div className="text-2xl font-bold text-gray-800">{fail_amount}</div>
                <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" viewBox="0 0 20 20" 
                    fill="currentColor">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 z-0">
                <Line height={100} data={data3} options={chartOptions} />
              </div>
            </div>

            <div className="relative p-5  overflow-hidden bg-white shadow-sm border border-gray-100 rounded-md">
              <div className="font-semibold text-sm text-gray-600 font-segoe uppercase text-left mb-3">Source Channels</div>
              <div className="relative z-10 flex items-center pt-1">
                
                <div className='flex flex-wrap mb-1 flex-row flex-shrink text-xs pt-1 gap-2'>
                  <div>
                        <span className='bg-gray-100 rounded px-2 py-1 font-bold text-yellow-400'>Mtn</span>
                        <h6 className="text-xs font-semibold leading-tight py-1 pt-2 text-yellow-600">{m}</h6>
                  </div>
                  <div>
                     <span className='bg-gray-100 rounded px-2  py-1 font-bold text-red-500'>Vodafone</span>
                      <h6 className="text-xs font-semibold leading-tight py-1 pt-2 text-red-700">{v}</h6>
                  </div>
                  <div>
                    <span className='bg-blue-50 rounded px-2  py-1 font-bold text-blue-500'>AitelTigo</span>
                      <h6 className="text-xs font-semibold leading-tight py-1 pt-2 text-blue-700">{a}</h6>
                  </div>
                  <div>
                      <span className='bg-gray-100 text-green-500 rounded px-2 py-1 font-bold'>Cards</span>
                      <h6 className="text-xs font-semibold leading-tight py-1 pt-2 text-green-700">{c}</h6>
                  </div>
                  <div>
                  <span className='bg-gray-100 text-pink rounded px-2 py-1 font-bold'>Wallets</span>
                      <h6 className="text-xs font-semibold leading-tight py-1 pt-2 text-pink">{w}</h6>
                  </div>
               </div>
                
              </div>

              <div className="absolute bottom-0 inset-x-0  z-0">
                <Line height={100} data={data4} options={chartOptions} />
              </div>
            </div>     
    </>
  );
}