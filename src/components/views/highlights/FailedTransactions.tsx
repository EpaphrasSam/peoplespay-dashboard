import React from "react";
import { Link } from "react-router-dom";
import FailedHighLightsTable from "../../tables/FailedHighLIghtTable";

type AppProps = any;

const FailedTransactionsHighLight = ({transactions}:{transactions:AppProps}) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-left">
                Failed Transactions <span className='relative text-indigo-800 leading-8 text-sm'>latest highlights...</span>
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link to='/allfailed-transactions'>
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
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light text-xs">
              <tr>
                <th className="px-6 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Time
                </th>
                <th className="px-6  align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Customer 
                </th>
                <th className="px-6  align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Amount 
                </th>
                <th className="px-6  align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Acc_type 
                </th>
              </tr>
            </thead>
            <tbody>
              <FailedHighLightsTable transactions={transactions}/>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FailedTransactionsHighLight;
