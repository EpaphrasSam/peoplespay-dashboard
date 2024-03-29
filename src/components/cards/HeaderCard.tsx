import React from "react";

 const HeaderCard: React.FC<{title:string, value:string, icon:any,color:string}> = ({value,icon, title,color}) => {
  return (
    <>
    <div className={`relative overflow-hidden pl-1 bg-${color}-400 rounded-lg shadow-md mb-2 min-w-60 font-segoe`}>
      <div className="flex w-auto h-24 py-2 px-4 bg-white rounded-lg justify-between">
        <div className="my-auto">
           <p className="font-semibold text-gray-600 mb-2 text-sm">{title}</p>
           <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="my-auto">
            {icon}                  
        </div>
      </div>
    </div>
 </>
  )
}

export default HeaderCard;