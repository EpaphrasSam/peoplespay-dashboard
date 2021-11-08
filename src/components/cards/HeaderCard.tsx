import React from "react";


export default function CardStats() {
  return (
    <>
       <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-md border-1 border-red-700 h-32">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-red-700 uppercase text-xs mb-5">
                Total Amout Paid
              </h5>
              <span className="font-bold text-xl text-blueGray-700">
                GHS 2,251
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <i
                className="fas fa-coins inline-flex items-center justify-center w-32 h-60"
              >
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
