import React from 'react';

import HeaderCards from '../cards/HeaderCards'
import BodyCard from '../cards/BodyCard';

function Dashboard() {
    return (
        <>
       <HeaderCards/>
      <div className="flex flex-wrap mb-10">
        <div className="w-full lg:w-4/12 xl:w-4/12 xl:mb-0 px-4">
          <BodyCard/>
        </div>
        <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard/>
          </div>
         <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard/>
          </div>
      </div>
      
  </>
    )
}

export default Dashboard;