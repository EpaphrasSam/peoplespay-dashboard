import React from "react";
import {Link} from 'react-router-dom'
import  PaidHighLightTable from '../../tables/PaidHighLightTable'

type AppProps = any;

const PaidHighLights = ({transactions}:{transactions:AppProps}) => {
  //console.log(transactions);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-left">
                Successful Transactions <span className='text-indigo-800 px-2 leading-8 text-sm'>showing latest highlights...</span>
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link to='allpaid-transactions'>
              <button
                className="tracking-wide bg-indigo-50 text-indigo-500 active:bg-indigo-600 hover:underline text-sm font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                View All
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse text-sm">
            <thead>
              <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Transaction date
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Transaction time
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Customer name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Amount
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Pay_acc_type
                </th>
              </tr>
            </thead>
            <tbody>
              <PaidHighLightTable transactions={transactions}/>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PaidHighLights;
