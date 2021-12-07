import React from "react";

const BodyCard: React.FC<{title:string,value:string,icon:string}> = ({title,value,icon}) => {
 
  return(
    <>
       <div className="relative flex flex-col min-w-0 break-words bg-red-900 rounded mb-6 xl:mb-4 shadow-md border-1 border-red-700 h-32 w-80">
        <div className=" p-4 my-5">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full  flex-1">
              <h5 className="text-gray-300 uppercase text-xs mb-2 font-semibold font-sans">
                {title}
              </h5>
              <span className="font-semibold text-3xl text-gray-300">
                 {value}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <i
                className={`${icon} p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-emerald-500 text-gray-300`}
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