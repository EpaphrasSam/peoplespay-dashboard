import React from "react";

 const CardStats: React.FC<{title:string, amount:string, icon:string}> = ({amount,icon, title}) => {
  return (
    <>
    <div className="relative flex flex-col min-w-0 break-words bg-red-900 rounded mb-6 xl:mb-0 shadow-md border-1 border-red-700 h-auto md:h-32">
     <div className="flex-auto p-4">
       <div className="flex flex-wrap">
         <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
           <h5 className="text-gray-300 uppercase text-xs mb-5">
             {title}
           </h5>
           <span className="font-bold text-3xl text-gray-300">
            GH¢ {Number.parseFloat(amount).toFixed(2)}
           </span>
         </div>
         <div className="relative pr-12 flex-initial">
           <i
             className={`${icon} inline-flex items-center text-gray-300`}
           >
           </i>
        </div>
       </div>
     </div>
   </div>
 </>
  )
}

export default CardStats;