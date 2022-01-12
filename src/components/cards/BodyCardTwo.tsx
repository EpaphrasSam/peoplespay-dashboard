import React from "react";

const BodyCard: React.FC<{title:string,icon:string, status:undefined|string, statusIcon:undefined|string, m:number,a:number,w:number,v:number,c:number}> = ({title,icon,status,statusIcon,m,a,v,c,w}) => {
 
  return(
    <>
       <div className="relative flex flex-col min-w-0 break-words bg-red-900 rounded mb-6 xl:mb-4 shadow-md border-1 border-red-700 h-28 hover:bg-red-800">
        <div className=" p-4 my-5">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full  flex-1">
              <h5 className="text-gray-300 uppercase text-xs mb-2 font-semibold font-sans">
                {title}
              </h5>
              <div className='grid grid-cols-5 divide-x-1 divide-green-500 text-xs pt-1'>
                <div>
                    <span className='bg-yellow-400 rounded px-2 text-white font-bold'>M</span>
                    <h6 className="text-xs font-semibold leading-tight text-white py-1 pt-2">{m}</h6>
                </div>
                <div>
                <span className='bg-red-500 rounded px-2 text-white font-bold'>V</span>
                    <h6 className="text-xs font-semibold leading-tight text-white py-1 pt-2">{v}</h6>
                </div>
                <div>
                <span className='bg-blue-500 rounded px-2 text-white font-bold'>AT</span>
                    <h6 className="text-xs font-semibold leading-tight text-white py-1 pt-2">{a}</h6>
                </div>
                <div>
                <span className='bg-green-500 rounded px-2 text-white font-bold'>C</span>
                    <h6 className="text-xs font-semibold leading-tight text-white py-1 pt-2">{c}</h6>
                </div>
                <div>
                <span className='bg-pink-700 rounded px-2 text-white font-bold'>W</span>
                    <h6 className="text-xs font-semibold leading-tight text-white py-1 pt-2">{w}</h6>
                </div>
            </div>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <i
                className={`${icon} p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full bg-red-800 text-gray-300`}
              >
              </i>
              <div className='sm:text-right sm:mr-1 text-white font-sans text-xs mt-5'>
              <i className={statusIcon}></i>
               {status}
            </div>
            </div>
            
          </div>
            {/* <div className='sm:text-right sm:mr-1 text-white font-sans text-xs '>
              <i className={statusIcon}></i>
               {status}
            </div> */}
        </div>
      </div>
    </>
  )
}
export default BodyCard;