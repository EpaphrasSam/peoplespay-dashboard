import React from "react";

const BodyCard: React.FC<{title:string,value:string,icon:string}> = ({title,value,icon}) => {
 
  return(
    <>
       <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-4 shadow-md border-1 border-red-700 h-32">
        <div className="flex-auto p-4 my-5">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-red-700 uppercase text-xs mb-2">
                {title}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                 {value}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <i
                className={`${icon} p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-emerald-500`}
              >
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default BodyCard;